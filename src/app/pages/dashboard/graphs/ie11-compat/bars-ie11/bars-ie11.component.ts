import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';

import {  Chart} from 'chart.js';
import { Dash, Extend } from 'src/app/core/model/Dash';
import { borderColor, hoverColor } from 'src/app/shared/constants';


@Component({
  selector: 'app-bars-ie11',
  templateUrl: './bars-ie11.component.html',
  styleUrls: ['./bars-ie11.component.css']
})
export class BarsIe11Component implements AfterViewInit {
  @Input() content: Extend;
  @Input() legend: string;

  @ViewChild('barCanvas') private barCanvas: ElementRef;  
  
  barChart: any;
  _content: Dash = new Dash();
  head = [];
  val = [];
  _legend: string;


  backColor =[
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
]



  constructor() { this._legend = ''}

  ngAfterViewInit(): void {
    this.optimizer();
    this.charChange();
    this.barChartMethod();        
  }

  optimizer(){        
    Object.values(this.content).forEach((value) => {   
      this.head.push(value.description);
      this.val.push(value.count);
    });            
    this._content.header = this.head;
    this._content.value = this.val;
    
    
  }

  charChange(){    
    const index: number = this.legend.indexOf('|');    
    const flg: boolean = this.legend.includes('Total');
    const values: string = flg? this.legend.slice(0,index-1) : 'Total ' + this.legend.slice(0,index-1);
    this._legend = values;
  }

  barChartMethod() {        
    this.barChart = new Chart (this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this._content.header,//['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],        
        datasets: [{
          label: this._legend,//'# of Votes'
          data: this._content.value,//[200, 50, 30, 15, 20, 34],
          backgroundColor: hoverColor,
          borderColor: borderColor,
          borderWidth: 1
        }]
      }
    });
  }
}
