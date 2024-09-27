import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeskOccupancy, DeskOccupancyFilter } from 'src/app/api/models';
import { DeskOccupancyService } from 'src/app/api/services';

@Component({
    selector: 'app-activity-history',
    templateUrl: './activity-history.component.html',
    styleUrls: ['./activity-history.component.scss']
})
export class ActivityHistoryComponent implements OnInit, OnDestroy {

    formGroup = this.fb.group({
        floorNumber: [null as number | null],
        workerEmail: [""],
        reservationDate: [""],
    });

    desksOccupancy: DeskOccupancy[];
    deskOccupancyFilter: DeskOccupancyFilter;

    sub: Subscription = new Subscription();

    constructor(private deskOccupancyService: DeskOccupancyService, private fb: FormBuilder) { }

    ngOnInit(): void {
        this.initFilteredDesksOccupancy();
        this.subscribeFormGroup();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    protected releaseDesk(desk: DeskOccupancy) {
        this.sub.add(this.deskOccupancyService.releaseDeskOccupancy(desk.id, desk).subscribe(val => {
            this.initFilteredDesksOccupancy();
        }));
    }

    protected deleteDesk(desk: DeskOccupancy) {
        this.sub.add(this.deskOccupancyService.deleteDeskOccupancy(desk.id).subscribe(val => {
            this.initFilteredDesksOccupancy();
        }));
    }

    private initFilteredDesksOccupancy(): void {
        this.deskOccupancyFilter = this.formGroup.getRawValue() as DeskOccupancyFilter;
        this.getFilteredDesksOccupancy(this.deskOccupancyFilter);
    }

    private getFilteredDesksOccupancy(deskOccupancyFilter: DeskOccupancyFilter): void {
        this.sub.add(this.deskOccupancyService.getFilteredDesksOccupancy(deskOccupancyFilter).subscribe(val => {
            this.desksOccupancy = val;
        }));
    }

    private subscribeFormGroup(): void {
        this.sub.add(this.formGroup.valueChanges.subscribe(val => {
            if (val.floorNumber !== null && val.floorNumber !== undefined) {
                if (val.floorNumber > 7 || val.floorNumber < 1) {
                    this.formGroup.get('floorNumber')?.setValue(null);
                }
            }
            this.initFilteredDesksOccupancy();
        }));
    }

}