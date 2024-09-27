import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DeskOccupancy } from '../models';

@Injectable({
    providedIn: 'root'
})
export class DeskOccupancyService {

    constructor(private httpClient: HttpClient) { }

    getDeskOccupancyById(id: number): Observable<DeskOccupancy> {
        return this.httpClient.get<DeskOccupancy>(`${environment.apiUrl}/DeskOccupancy/${id}`);
    }

    getDesksOccupancy(): Observable<DeskOccupancy[]> {
        return this.httpClient.get<DeskOccupancy[]>(`${environment.apiUrl}/DeskOccupancy`);
    }

    addBookDesk(deskOccupancy: DeskOccupancy): Observable<DeskOccupancy> {
        return this.httpClient.post<DeskOccupancy>(`${environment.apiUrl}/DeskOccupancy`, deskOccupancy);
    }

    releaseDeskOccupancy(id: number, deskOccupancy: DeskOccupancy): Observable<void> {
        return this.httpClient.put<void>(`${environment.apiUrl}/DeskOccupancy/Release/${id}`, deskOccupancy);
    }
    

    deleteDeskOccupancy(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${environment.apiUrl}/DeskOccupancy/${id}`);
    }
}
