import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DeskOccupancy } from "../models";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class DeskOccupancyService {

    constructor(private httpClient: HttpClient) { }

    getDeskOccupancyById(id: number): Observable<DeskOccupancy> {
        return this.httpClient.get<DeskOccupancy>(environment.apiUrl + '/DeskOccupancy/' + id);
    }

}
