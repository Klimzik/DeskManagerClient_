import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeskOccupancyService } from './api/services';
import { HttpClientModule } from '@angular/common/http';
import { ActivityHistoryComponent, DeskBookingComponent, HeaderComponent, HomePageComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Dodaj ten import
import { DeskNumberDirective, FloorNumberDirective } from './api/directivies';





const COMPONENTS = [HeaderComponent, DeskBookingComponent, ActivityHistoryComponent, HomePageComponent];
const DIRECTIVIES = [DeskNumberDirective, FloorNumberDirective];

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS,
    DIRECTIVIES,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [DeskOccupancyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
