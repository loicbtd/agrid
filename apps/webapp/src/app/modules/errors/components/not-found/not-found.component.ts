import { Component } from '@angular/core';

@Component({
  styles: [
    `
      a {
        text-decoration: none !important;
      }
    `,
  ],
  template: `
    <div
      class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
      <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
        <div
          class="col-12 xl:col-6"
          style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, rgba(33, 150, 243, 0.4) 10%, rgba(33, 150, 243, 0) 30%);"
        >
          <div
            class="flex justify-content-center h-full w-full m-0 py-7 px-4"
            style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));"
          >
            <div class="grid flex-column align-items-center">
              <div
                class="flex justify-content-center align-items-center bg-blue-500 border-circle"
                style="width:3.2rem; height:3.2rem;"
              >
                <i class="text-50 pi pi-fw pi-question text-2xl"></i>
              </div>
              <h1 class="text-900 font-bold lg:text-5xl mb-2">
                Vous semblez perdu
              </h1>
              <span class="text-600"
                >La ressource demandée n'est pas disponible.</span
              >
              <a
                [routerLink]="['/support/faq']"
                class="col-12 flex align-items-center py-5 mt-6 border-300 border-bottom-1"
              >
                <div
                  class="flex justify-content-center align-items-center bg-cyan-400 border-round"
                  style="height:3.5rem; width:3.5rem;"
                >
                  <i class="text-50 pi pi-fw pi-table text-2xl"></i>
                </div>
                <div class="ml-4">
                  <p class="text-900 lg:text-xl font-medium mb-0 block">
                    Questions fréquemment posées
                  </p>
                  <span class="text-600 lg:text-xl"> Lire la FAQ </span>
                </div>
              </a>

              <div class="col-12 mt-5 text-center">
                <i
                  class="pi pi-fw pi-arrow-left text-blue-500 mr-2"
                  style="vertical-align:center;"
                ></i>
                <a [routerLink]="['/showcase']" class="text-blue-500 decoration"
                  >Aller à l'accueil</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class NotFoundComponent {}