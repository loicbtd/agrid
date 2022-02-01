import { ErrorHandler } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { lastValueFrom } from 'rxjs';
import { ApplicationError } from '../errors/application.error';
import { ToastMessageService } from '../services/toast-message.service';
import { HttpErrorResponse } from '@angular/common/http';

export class ErrorsHandler implements ErrorHandler {
  constructor(
    private readonly toastMessageService: ToastMessageService,
    private readonly translateService: TranslateService
  ) {}

  async handleError(error: any) {
    if (error.promise && error.rejection) {
      error = error.rejection;
    }

    if (!environment.production) {
      console.error(error);
    }

    if (error instanceof ApplicationError) {
      this.toastMessageService.showError(
        await lastValueFrom(this.translateService.get(error.constructor.name))
      );
    } else if (error instanceof HttpErrorResponse) {
      if (error.url?.includes(environment.webserviceOrigin)) {
        this.toastMessageService.showError(error.error.message);
      }
    } else {
      this.toastMessageService.showError(
        await lastValueFrom(this.translateService.get('UNKOWN_ERROR'))
      );
    }
  }
}
