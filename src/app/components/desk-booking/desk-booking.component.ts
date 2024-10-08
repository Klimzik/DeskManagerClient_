import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DeskOccupancy } from 'src/app/api/models';
import { DeskOccupancyService } from 'src/app/api/services';

@Component({
    selector: 'app-desk-booking',
    templateUrl: './desk-booking.component.html',
    styleUrls: ['./desk-booking.component.scss']
})
export class DeskBookingComponent implements OnInit, OnDestroy {

    formGroup = this.fb.group({
        id: [null as number | null],
        deskNumber: [null as number | null, Validators.required],
        floorNumber: [null as number | null, Validators.required],
        workerEmail: ["", [Validators.required, Validators.email]],
        reservationDate: ["", Validators.required],
        isOccupated: [true, Validators.required],
    });

    deskOccupancy: DeskOccupancy;
    sub: Subscription = new Subscription();
    deskNumberString: string;

    constructor(private fb: FormBuilder, private deskOccupancyService: DeskOccupancyService, private snackBar: MatSnackBar, private router: Router, 
        private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.checkRoute();
        this.setCurrentDate();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    protected handleBookClick(): void {
        if (this.formGroup.valid) {
            this.addBookDesk();
        }
    }

    private checkRoute(): void {
        this.sub.add(this.route.params.subscribe(params => {
            this.deskNumberString = params['deskNumber'];
            if (/^\d{4}$/.test(this.deskNumberString!) || this.deskNumberString === undefined) {
                const deskNumber = parseInt(this.deskNumberString, 10);
                this.formGroup.get('deskNumber')?.setValue(deskNumber);
            }
            else {
                this.router.navigate(['/home-page']);
                this.invalidRouteBar();
            }
        }));
    }

    private addBookDesk(): void {
        this.deskOccupancy = this.formGroup.getRawValue() as DeskOccupancy;
        this.sub.add(this.deskOccupancyService.addBookDesk(this.deskOccupancy).subscribe(val => {
            this.openSuccessfullBar();
            this.navigateToHomePage();
        }));
    }

    private openSuccessfullBar(): void {
        this.snackBar.open('Desk booking went well!', 'Close', {
            duration: 4000,
        });
    }

    private invalidRouteBar(): void {
        this.snackBar.open('Invalid link', 'Close', {
            duration: 4000,
        });
    }

    protected navigateToHomePage(): void {
        this.router.navigate(['/home-page']);
    }

    private setCurrentDate(): void {
        const currentDate = new Date();
        const formattedDate = this.formatDate(currentDate);
        this.formGroup.get('reservationDate')?.setValue(formattedDate);
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    protected isFormGroupValid(): boolean {
        return this.formGroup.valid;
    }

}