import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router";
import { AppRoutingModule } from './app-routing.module';
import {NavbarComponent} from "./navbar/navbar.component";
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
