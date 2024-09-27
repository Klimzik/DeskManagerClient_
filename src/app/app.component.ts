import { Component, OnInit } from '@angular/core';
import { DeskOccupancyService } from './api/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'DeskManagerClient_';

  constructor() { }

}