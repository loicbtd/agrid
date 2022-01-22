import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(
    private readonly messageService: MessageService,
    private readonly translateService: TranslateService
  ) {}

  async showSuccess(message: string) {
    this.messageService.add({
      key: 'global-toast',
      severity: 'success',
      summary: await lastValueFrom(this.translateService.get('SUCCESS')),
      detail: message,
    });
  }

  async showInfo(message: string) {
    this.messageService.add({
      key: 'global-toast',
      severity: 'info',
      summary: await lastValueFrom(this.translateService.get('INFORMATION')),
      detail: message,
    });
  }

  async showWarning(message: string) {
    this.messageService.add({
      key: 'global-toast',
      severity: 'warn',
      summary: await lastValueFrom(this.translateService.get('WARNING')),
      detail: message,
    });
  }

  async showError(message: string) {
    this.messageService.add({
      key: 'global-toast',
      severity: 'error',
      summary: await lastValueFrom(this.translateService.get('ERROR')),
      detail: message,
    });
  }
}
