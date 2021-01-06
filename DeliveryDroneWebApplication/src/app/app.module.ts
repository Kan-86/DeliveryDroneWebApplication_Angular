import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {NavbarComponent} from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { DialogDataComponent } from './dialog-data/dialog-data.component';
import {MatDialogModule} from '@angular/material/dialog';
import {IMqttMessage, IMqttServiceOptions} from 'ngx-mqtt/lib/mqtt.model';
import {MqttModule} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: '46.101.125.210',
  port: 8883,
  path: '/mqtt'
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    DialogDataComponent,
  ],
  imports: [
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    HttpClientModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    FlexLayoutModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MqttModule,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
