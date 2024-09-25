import { Component, OnInit } from '@angular/core';
import { DeskOccupancyService } from './api/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'DeskManagerClient_';


  constructor(private deskOccupancyService: DeskOccupancyService) {

  }

  ngOnInit(): void {
    console.log("aa");
    this.deskOccupancyService.getDeskOccupancyById(5).subscribe(val => {
        console.log(val);
    });
  }
}
