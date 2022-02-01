import { Component, OnInit } from '@angular/core';
import { ToastMessageService } from '../../../../global/services/toast-message.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
declare global {
  interface Window {
    chatwootSDK?: any;
    $chatwoot?: any;
    chatwootSettings?: any;
  }
}
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  styles: [
    `
      .footer-section {
        background: radial-gradient(
          77.36% 256.97% at 77.36% 57.52%,
          #4bc714 0%,
          #e8be28 100%
        );
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  isChatwootLoaded = false;

  displayMobileMenu = true;

  themeElement: any;

  constructor(
    private readonly toastService: ToastMessageService,
    private readonly router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const t = 'script';
    const g = document.createElement(t),
      s = document.getElementsByTagName(t)[0];
    g.src=environment.chatwootBaseUrl+"/packs/js/sdk.js";
    g.defer = true;
    g.async = true;
    s.parentNode && s.parentNode.insertBefore(g, s);
    g.onload = function () {
      window.chatwootSettings = {
        showPopoutButton: true,
        type: 'expanded_bubble',
        launcherTitle: 'Chattez avec nous'
      }
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
    if (!window.$chatwoot.hasLoaded && !window.chatwootSDK) {
      this.toastService.showWarning(
        'La discussion en temps réel ne peut pas être chargée. Vous pouvez nous contacter via le formulaire'
      );
      this.router.navigate(['/support/contact']);
    } else {
      this.isChatwootLoaded = true;
    }
  }
}
