import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
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

  ngOnInit(): void {
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
      window.$chatwoot.toggle('open'); // To open widget
    });
  }
}
