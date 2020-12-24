import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogDataModel} from '../shared/models/DialogDataModel';

@Component({
  selector: 'app-dialog-data',
  templateUrl: './dialog-data.component.html',
  styleUrls: ['./dialog-data.component.css']
})
export class DialogDataComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogDataModel) { }

  ngOnInit(): void {
  }

}
