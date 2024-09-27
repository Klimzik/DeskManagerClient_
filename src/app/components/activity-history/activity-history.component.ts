import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeskOccupancy } from 'src/app/api/models';
import { DeskOccupancyService } from 'src/app/api/services';

@Component({
    selector: 'app-activity-history',
    templateUrl: './activity-history.component.html',
    styleUrls: ['./activity-history.component.scss']
})
export class ActivityHistoryComponent implements OnInit, OnDestroy {

    desksOccupancy: DeskOccupancy[];

    sub: Subscription = new Subscription();

    constructor(private deskOccupancyService: DeskOccupancyService) {

    }

    ngOnInit(): void {
        this.sub.add(this.deskOccupancyService.getDesksOccupancy().subscribe(val => {
            this.desksOccupancy = val;
        }));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}