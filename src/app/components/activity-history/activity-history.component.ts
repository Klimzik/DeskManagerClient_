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
        this.getDesksOccupancy()
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getDesksOccupancy(): void {
        this.sub.add(this.deskOccupancyService.getDesksOccupancy().subscribe(val => {
            this.desksOccupancy = val;
        }));
    }

    releaseDesk(desk: DeskOccupancy) {
        this.sub.add(this.deskOccupancyService.releaseDeskOccupancy(desk.id, desk).subscribe(val => { 
            this.getDesksOccupancy();
        }));
    }

    deleteDesk(desk: DeskOccupancy) {
        this.sub.add(this.deskOccupancyService.deleteDeskOccupancy(desk.id).subscribe(val => { 
            this.getDesksOccupancy();
        }));
    }

}