import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SetupComponent } from './components/setup/setup.component';
import { FinishedComponent } from './components/finished/finished.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/setup'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'setup',
    component: SetupComponent
  },
  {
    path: 'finished',
    component: FinishedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
