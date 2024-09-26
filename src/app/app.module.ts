import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeskOccupancyService } from './api/services';
import { HttpClientModule } from '@angular/common/http';
import { ActivityHistoryComponent, DeskBookingComponent, HeaderComponent, HomePageComponent, ReleaseDeskComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';


const COMPONENTS = [HeaderComponent, DeskBookingComponent, ActivityHistoryComponent, ReleaseDeskComponent, HomePageComponent];

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DeskOccupancyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
