import { Component } from '@angular/core';
import { GoBackService } from '../../../../global/services/go-back.service';

@Component({
  template: `
    <div
      class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
      <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
        <div
          class="col-12 xl:col-6"
          style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, rgba(247, 149, 48, 0.4) 10%, rgba(247, 149, 48, 0) 30%);"
        >
          <div
            class="h-full w-full m-0 py-7 px-4"
            style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));"
          >
            <div class="grid flex flex-column align-items-center">
              <div
                class="flex justify-content-center align-items-center bg-orange-500 border-circle"
                style="width:3.2rem; height:3.2rem;"
              >
                <i class="text-50 pi pi-fw pi-lock text-2xl"></i>
              </div>
              <h1 class="text-900 font-bold text-4xl lg:text-5xl mb-2">
                Accès refusé
              </h1>
              <span class="text-600 text-center"
                >Vous n'avez pas les permissions nécessaires. Si cela ne vous
                semble pas normal, veuillez contacter le support.</span
              >
              <div class="col-12 mt-5 text-center">
                <p-button
                  pRipple
                  styleClass="p-button-rounded p-button-warning mr-2"
                  icon="pi pi-home"
                  label="Accueil"
                  [routerLink]="['/showcase']"
                ></p-button>
                <p-button
                  pRipple
                  icon="pi pi-arrow-left"
                  label="Retour"
                  styleClass="p-button-rounded p-button-warning p-button-text"
                  (click)="goBack()"
                ></p-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccessDeniedComponent {
  constructor(private readonly goBackService: GoBackService) {}

  goBack() {
    this.goBackService.goBack();
  }
}
