import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    const t = 'script';
    const BASE_URL = 'https://support.agrid.ml';
    const g = document.createElement(t),
      s = document.getElementsByTagName(t)[0];
    g.src = '/assets/js/chatwoot_sdk.js';
    g.defer = true;
    g.async = true;
    s.parentNode && s.parentNode.insertBefore(g, s);
    g.onload = function () {
      if (window.chatwootSDK) {
        window.chatwootSDK.run({
          websiteToken: 'JDtptbJgfyAYjLJkTUW6eegv',
          baseUrl: BASE_URL,
        });
      }
    };

    window.addEventListener('chatwoot:ready', function () {
      console.log('antho le bg');
      window.$chatwoot.toggle('open'); // To open widget
    });
  }
}
