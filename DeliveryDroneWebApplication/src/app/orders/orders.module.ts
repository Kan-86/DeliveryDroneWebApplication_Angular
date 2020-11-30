import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    FlexLayoutModule
  ]
})
export class OrdersModule { }
