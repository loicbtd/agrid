import { Component } from '@angular/core';

@Component({
  selector: 'workspace-progress-spinner',
  styleUrls: ['./progress-spinner.component.scss'],
  template: `
    <div id="spinner">
      <div id="spinner_1" class="spinner"></div>
      <div id="spinner_2" class="spinner"></div>
      <div id="spinner_3" class="spinner"></div>
    </div>
  `,
})
export class ProgressSpinnerComponent {}
