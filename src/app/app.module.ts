import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeskOccupancyService } from './api/services';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components';

const COMPONENTS = [HeaderComponent]

@NgModule({
  declarations: [
    AppComponent,
    COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DeskOccupancyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
