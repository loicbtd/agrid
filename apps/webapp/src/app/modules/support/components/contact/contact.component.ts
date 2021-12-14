import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-support-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  contactRequestForm!: FormGroup;
  sendingMail = false;
  constructor(
    private _fb: FormBuilder,
    private _contactService: ContactService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.contactRequestForm = this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      explanation: ['', Validators.required],
    });
  }

  onSubmitContactForm() {
    if (!this.contactRequestForm.valid) {
      return;
    }
    this.sendingMail = true;
    this._contactService
      .sendContactMail({
        firstname: this.contactRequestForm.get('firstname')?.value,
        lastname: this.contactRequestForm.get('lastname')?.value,
        email: this.contactRequestForm.get('email')?.value,
        subject: this.contactRequestForm.get('subject')?.value,
        explanation: this.contactRequestForm.get('explanation')?.value,
      })
      .subscribe(() => {
        this.contactRequestForm.reset();
        this._messageService.add({
          key: 'support-toast',
          severity: 'success',
          sticky: true,
          summary: 'Demande de support',
          detail: 'Votre demande a été envoyée au support ✔',
        });
        this.sendingMail = false;
      });
  }
}
