import { Component } from '@angular/core';

@Component({
  selector: 'workspace-progress-spinner',
  template: `
    <div class="cssload-body">
      <span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
      <div class="cssload-base">
        <span></span>
        <div class="cssload-face"></div>
      </div>
    </div>
    <div class="cssload-longfazers">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  `,
})
export class ProgressSpinnerComponent {}
