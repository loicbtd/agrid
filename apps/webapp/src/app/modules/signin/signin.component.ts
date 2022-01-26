import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImpossibleToSigninError } from '../../global/errors/impossible-to-signin.error';
import { SigninService } from './signin.service';

@Component({
  selector: 'app-login',
  styles: [
    `
      :host ::ng-deep {
        .p-inputtext {
          width: 100%;
          padding-right: 2.5rem;
        }

        i {
          right: 0.75rem;
          color: #58480e;
          position: absolute;
          top: 50%;
          margin-top: -0.5rem;
        }
      }
      /* :host ::ng-deep .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
      }
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
      } */
    `,
  ],
  template: `
    <div
      class="surface-card flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
      <div
        class="grid justify-content-center p-2 lg:p-0"
        style="min-width: 80%"
      >
        <div class="col-12 mt-5 xl:mt-0 text-center">
          <img src="assets/logo-agrid.svg" class="mb-5" style="width: 10rem" />
        </div>
        <div
          class="col-12 xl:col-6"
          style="
        border-radius: 56px;
        padding: 0.3rem;
        background: linear-gradient(
          180deg,
          rgba(75, 199, 20, 0.4) 10%,
          rgba(232, 190, 40, 0) 30%
        );
      "
        >
          <div
            class="surface-card h-full w-full m-0 py-7 px-4"
            style="border-radius: 53px"
          >
            <div class="text-center mb-5">
              <div class="text-900 text-3xl font-medium mb-3">Bienvenue !</div>
              <span class="text-600 font-medium">
                Connectez-vous pour continuer
              </span>
            </div>

            <div class="w-full md:w-10 mx-auto">
              <form [formGroup]="form" novalidate class="form-group">
                <div class="p-field mt-5">
                  <span class="p-float-label w-full">
                    <input
                      id="email"
                      formControlName="email"
                      type="email"
                      pInputText
                      class="w-full"
                      [ngClass]="{
                        'ng-invalid ng-dirty':
                          form.controls.email.touched &&
                          form.controls.email.invalid
                      }"
                    />
                    <label for="email">Courriel</label>
                  </span>
                  <div class="p-d-flex p-flex-column">
                    <small
                      class="p-error"
                      *ngIf="
                        form.controls.email.touched &&
                        form.controls.email.errors?.required
                      "
                    >
                      Le courriel est requis
                    </small>
                    <small
                      class="p-error"
                      *ngIf="
                        form.controls.email.touched &&
                        form.controls.email.errors?.email
                      "
                    >
                      Le courriel n'est pas valide
                    </small>
                  </div>
                </div>

                <div class="p-field mt-5">
                  <span class="p-float-label">
                    <p-password
                      inputId="password"
                      formControlName="password"
                      [toggleMask]="true"
                      [feedback]="false"
                      styleClass="w-full"
                      [ngClass]="{
                        'ng-invalid ng-dirty':
                          form.controls.password.touched &&
                          form.controls.password.invalid
                      }"
                    ></p-password>
                    <label for="password">Mot de passe</label>
                  </span>
                  <small
                    class="p-error"
                    *ngIf="
                      form.controls.password.touched &&
                      form.controls.password.errors?.required
                    "
                  >
                    Le mot de passe est requis
                  </small>
                </div>

                <p-button
                  pRipple
                  label="Connexion"
                  styleClass="w-full mt-3"
                ></p-button>
              </form>

              <div
                class="w-full md:w-10 mx-auto mt-4"
                style="text-align: center"
              >
                <p-button
                  pbutton
                  pripple
                  styleClass="p-button-text p-button-rounded"
                  label="Accueil"
                >
                </p-button>

                <p-button
                  pbutton
                  pripple
                  styleClass="p-button-text p-button-rounded p-button-secondary"
                  label="Pas encore inscrit ?"
                  [routerLink]="['subscription']"
                >
                </p-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SigninComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly signinService: SigninService,
    private readonly fb: FormBuilder,
    public readonly router: Router
  ) {}

  log(thing: any) {
    console.log(thing);
  }

  async signin() {
    if (this.form.invalid) {
      return;
    }

    try {
      await this.signinService.signin({
        email: this.form.get('email')?.value,
        password: this.form.get('password')?.value,
      });

      this.router.navigate(['/']);
    } catch (error) {
      throw new ImpossibleToSigninError();
    }
  }
}
