import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatInputModule,
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatExpansionModule,
  MatProgressBarModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { EmployeeCreateComponent } from './employees/employee-create/employee-create.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    HeaderComponent,
    EmployeeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
