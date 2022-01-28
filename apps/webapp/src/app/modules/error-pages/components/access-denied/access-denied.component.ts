import { Component } from '@angular/core';

@Component({
  template: `
    <div
      class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
    >
      <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
        <div class="col-12 mt-5 xl:mt-0 text-center">
          <img
            src="assets/layout/images/logo-orange.svg"
            alt="Sakai logo"
            class="mb-5"
            style="width:81px; height:60px;"
          />
        </div>
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
              <img
                src="assets/layout/images/asset-access.svg"
                alt="Access denied"
                class="mt-5"
                width="80%"
              />
              <div class="col-12 mt-5 text-center">
                <i
                  class="pi pi-fw pi-arrow-left text-blue-500 mr-2"
                  style="vertical-align:center;"
                ></i
                ><a href="/" class="text-blue-500">Aller à l'accueil</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccessDeniedComponent {}
