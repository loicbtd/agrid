import { Component } from '@angular/core';

@Component({
  template: `
    <p-toast key="support-toast"></p-toast>
    <router-outlet></router-outlet>
  `,
})
export class SupportComponent {}
