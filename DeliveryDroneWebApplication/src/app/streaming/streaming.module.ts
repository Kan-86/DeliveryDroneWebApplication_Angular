import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingComponent } from './streaming.component';


@NgModule({
  declarations: [StreamingComponent],
  imports: [
    CommonModule,
    StreamingRoutingModule
  ]
})
export class StreamingModule { }
