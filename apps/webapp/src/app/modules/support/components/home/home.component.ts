import { Component, OnInit } from '@angular/core';
import { ToastMessageService } from '../../../../global/services/toast-message.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
declare global {
  interface Window {
    chatwootSDK?: any;
    $chatwoot?: any;
  }
}
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isChatwootLoaded = false;

  constructor(
    private readonly toastService: ToastMessageService,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const t = 'script';
    const g = document.createElement(t),
      s = document.getElementsByTagName(t)[0];
    g.src = '/assets/js/chatwoot_sdk.js';
    g.defer = true;
    g.async = true;
    s.parentNode && s.parentNode.insertBefore(g, s);
    g.onload = function () {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: environment.chatwootEnvironmentToken,
          baseUrl: environment.chatwootBaseUrl,
        });
      }
    };
    window.addEventListener('chatwoot:ready', function () {
      window.$chatwoot.toggle('open');
    });
    await new Promise((resolve) => setTimeout(resolve, 3000));
    if (!window.$chatwoot.hasLoaded) {
      this.toastService.showWarning(
        'La discussion en temps réel ne peut pas être chargée. Vous pouvez nous contacter via le formulaire'
      );
      this.router.navigate(['/support/contact']);
    } else {
      this.isChatwootLoaded = true;
    }
  }
}
