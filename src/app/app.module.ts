import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BoardComponent } from './components/board/board.component';
import { CellComponent } from './components/cell/cell.component';
import { HeaderComponent } from './shared/header/header.component';
import { SetupComponent } from './components/setup/setup.component';
import { FinishedComponent } from './components/finished/finished.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SortableHeaderDirective } from './directives/sortable-header.directive';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BoardComponent,
    CellComponent,
    HeaderComponent,
    SetupComponent,
    FinishedComponent,
    SortableHeaderDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
