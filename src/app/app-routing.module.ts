import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityHistoryComponent, DeskBookingComponent, HomePageComponent, ReleaseDeskComponent } from './components';

const routes: Routes = [
  {path: 'desk-booking', component: DeskBookingComponent},
  {path: 'activity-history', component: ActivityHistoryComponent},
  {path: 'release-desk', component: ReleaseDeskComponent},
  {path: '**', component: HomePageComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
