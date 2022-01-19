import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private readonly messageService: MessageService) {}

  showSuccess(message: string) {
    this.messageService.add({ key: 'global-toast', severity: 'success', summary: 'Success', detail: message });
  }

  showInfo(message: string) {
    this.messageService.add({ key: 'global-toast', severity: 'info', summary: 'Information', detail: message });
  }

  showWarning(message: string) {
    this.messageService.add({ key: 'global-toast', severity: 'warn', summary: 'Warning', detail: message });
  }

  showError(message: string) {
    this.messageService.add({ key: 'global-toast', severity: 'error', summary: 'Error', detail: message });
  }
}
