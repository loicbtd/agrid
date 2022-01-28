import { Component } from '@angular/core';

@Component({
  selector: 'app-legal-page',
  templateUrl: './legal-page.component.html',
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
  styleUrls: ['./legal-page.component.scss'],
})
export class LegalPageComponent {
  
  displayMobileMenu = true;

  themeElement: any;
}
