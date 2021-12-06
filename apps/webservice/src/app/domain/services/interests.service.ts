import { Interest } from './../entities/interest.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInterestRequestDto } from 'api/requests/create-interest.request.dto';

@Injectable()
export class InterestService {
  constructor(
    @InjectRepository(Interest)
    private interestRepository: Repository<Interest>,
  ) {}

  async listInterests(): Promise<Interest[]> {
    const interests = await this.interestRepository.find();
    return interests;
  }

  async create(command: CreateInterestRequestDto): Promise<Interest> {
    let interest: Interest;
    try {
      interest = new Interest({
        label: command.label,
      });
      await this.interestRepository.insert(interest);
    } catch (error) {
      throw new ConflictException();
    }
    return interest;
  }
}
