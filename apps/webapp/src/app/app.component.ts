import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { ApplicationError } from './global/errors/application.error';
import { UndefinedStripePublishableKeyError } from './global/errors/undefined-stripe-publishable-key.error';
import { BlockUiService } from './global/services/block-ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly _blockUiService: BlockUiService,
    private readonly _titleService: Title
  ) {}

  ngOnInit(): void {
    this._titleService.setTitle(environment.webappName);
  }

  get $uiBlocked() {
    return this._blockUiService.$uiBlocked;
  }
}
