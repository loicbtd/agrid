import { Component } from '@angular/core';
import { BlockUiService } from './global/services/block-ui.service';

@Component({
  selector: 'agrid-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private readonly _blockUiService: BlockUiService) {}

  get $uiBlocked() {
    return this._blockUiService.$uiBlocked;
  }
}
