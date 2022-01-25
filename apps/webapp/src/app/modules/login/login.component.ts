import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  styles: [
    `
      :host ::ng-deep .p-password input {
        width: 100%;
        padding: 1rem;
      }
      :host ::ng-deep .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
      }
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
      }
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
              <span class="text-600 font-medium"
                >Connectez-vous pour continuer</span
              >
            </div>

            <div class="w-full md:w-10 mx-auto">
              <div class="form-group">
                <div class="p-field">
                  <span class="p-float-label w-full">
                    <input type="text" id="email" pInputText />
                    <label for="inputtext">Courriel</label>
                  </span>
                </div>

                <div class="p-field">
                  <span class="p-float-label w-full">
                    <p-password
                      inputId="password"
                      [toggleMask]="true"
                      [feedback]="false"
                      [ngClass]="{
                        'ng-invalid ng-dirty':
                          form.controls.password.dirty &&
                          form.controls.password.invalid
                      }"
                    ></p-password>
                    <label for="password">Mot de passe</label>
                  </span>
                  <small
                    class="p-invalid"
                    *ngIf="
                      form.controls.password.dirty &&
                      form.controls.password.errors?.required
                    "
                  >
                    Le mot de passe est requis
                  </small>
                </div>

                <button
                  pButton
                  pRipple
                  label="Connexion"
                  class="w-full p-3 text-xl"
                ></button>
              </div>

              <div
                class="w-full md:w-10 mx-auto mt-4"
                style="text-align: center"
              >
                <button
                  pbutton=""
                  pripple=""
                  label="Login"
                  class="p-ripple p-element p-button-text p-button-rounded border-none font-light line-height-2 text-500 p-button p-component"
                  [routerLink]="['/']"
                >
                  <span class="p-ink"></span>
                  <span class="p-button-label" style="color: #4bc714"
                    >Accueil</span
                  >
                </button>
                <button
                  pbutton=""
                  pripple=""
                  label="Login"
                  class="p-ripple p-element p-button-text p-button-rounded border-none font-light line-height-2 text-500 p-button p-component"
                  [routerLink]="['/subscription']"
                >
                  <span class="p-ink"></span>
                  <span class="p-button-label" style="color: #e8be28"
                    >Pas encore inscrit ?</span
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
  form = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(REGEX_PATTERNS.EMAIL)],
    ],
    password: ['', [Validators.required]],
  });

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private messageService: MessageService,
    public router: Router
  ) {}

  password: string;
}
