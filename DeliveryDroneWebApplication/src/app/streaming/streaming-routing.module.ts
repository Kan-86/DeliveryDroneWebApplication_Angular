import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StreamingComponent} from './streaming.component';

const routes: Routes = [{ path: '', component: StreamingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StreamingRoutingModule { }
