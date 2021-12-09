import { Component, OnInit } from '@angular/core';
import { Faq } from '../../models/faq.models';
import { FaqService } from '../../services/faq/faq.service';

@Component({
  selector: 'agrid-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent implements OnInit {
  faqs!: Faq[];

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.faqService.loadQuestions().subscribe((response) => {
      this.faqs = JSON.parse(JSON.stringify(response)).QAs.map(
        (item: { question: string; answer: string }) => {
          return new Faq({
            question: item.question,
            answer: item.answer,
          });
        }
      );
    });
  }

  toSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }

  srcrollInto(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
      element.classList.add('title-selected');
      element.classList.add('loaded');
    }
  }
}
