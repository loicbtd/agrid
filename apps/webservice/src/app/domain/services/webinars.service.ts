import { ParticipateWebinarRequestDto } from 'api/requests/participate-webinar.request.dto';
import { Interest } from './../entities/interest.entity';
import { User } from './../entities/user.entity';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { SearchWebinarsRequestDto } from 'api/requests/search-webinars.request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWebinarRequestDto } from 'api/requests/create-webinar.request.dto';
import { Webinar } from 'domain/entities/webinar.entity';
import { Repository } from 'typeorm';
import { EmailsService } from './emails.service';

@Injectable()
export class WebinarsService {
  constructor(
    @InjectRepository(Webinar)
    private webinarRepository: Repository<Webinar>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
    private emailsService: EmailsService,
  ) {}

  async list(command: SearchWebinarsRequestDto): Promise<Webinar[]> {
    let query = this.webinarRepository
      .createQueryBuilder('w')
      .select()
      .leftJoinAndSelect('w.interests', 'wi');

    if (command.contains) {
      const searchedWords = command.contains
        .replace(/[^0-9a-z]/gi, ' ')
        .trim()
        .split(' ')
        .map((word) => word + ':*')
        .join(' & ');

      query = query.where(
        "(to_tsvector(title || '' || about)) @@ to_tsquery(:searchedWords)",
        { searchedWords },
      );

      return await query.getMany();
    }

    if (command.interestsIds) {
      query = query.where('"interestId" IN (:...interestsIds)', {
        interestsIds: command.interestsIds,
      });
    }

    if (command.date) {
      query = query.where('w.date >= :dateRangeStart', {
        dateRangeStart: command.date,
      });
    }

    return await query.orderBy('w.date').getMany();
  }

  async create(
    command: CreateWebinarRequestDto,
    userId: string,
  ): Promise<Webinar> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    let interestsChoosen: Interest[];
    interestsChoosen = await this.interestRepository.findByIds(
      command.interestsIds,
    );

    let webinar: Webinar;
    try {
      webinar = new Webinar({
        title: command.title.charAt(0).toUpperCase() + command.title.slice(1),
        about: command.about,
        date: command.date,
        owner: user,
        interests: interestsChoosen,
        duration: command.duration,
        membersMax: command.membersNumber,
        membersCount: 0,
        isPresential: command.isPresential,
      });

      if (webinar.isPresential) {
        webinar.latitude = command.latitude;
        webinar.longitude = command.longitude;
      } else {
        webinar.link = command.link;
      }

      await this.webinarRepository.insert(webinar);
      await this.webinarRepository.save(webinar);
    } catch (error) {
      throw new ConflictException();
    }
    return webinar;
  }

  async participate(command: ParticipateWebinarRequestDto) {
    try {
      let webinar = await this.webinarRepository.findOneOrFail(
        command.webinarId,
      );
      await this.emailsService.sendParticipateEmailTo(command.email, webinar);
      webinar.membersCount++;
      await this.webinarRepository.save(webinar);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
