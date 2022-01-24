import { Component } from '@angular/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.scss'],
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }
    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
    }
    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
    }
  `],
})
export class SigninPageComponent {

  password: string;
}
