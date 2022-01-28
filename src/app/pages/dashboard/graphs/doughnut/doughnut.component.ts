import { Component, AfterViewInit, ElementRef, ViewChild, Input } from '@angular/core';
import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
} from 'chart.js';
import { Dash, Extend } from 'src/app/core/model/Dash';
import { hoverColor } from 'src/app/shared/constants';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.css']
})
export class DoughnutComponent implements AfterViewInit {

  @Input() content: Extend;
  @Input() validate: boolean;

  @ViewChild('doughnutCanvas') doughnutCanvas: ElementRef;

  doughnutChart: any;
  _content: Dash = new Dash();
  head = [];
  val = [];

  constructor() { }

  ngAfterViewInit() {

    //console.log(this.content);
    this.optimizer();
  }

  optimizer() {
    Object.values(this.content).forEach((val) => {
      this.val.push(val.count);
      if (this.validate) {
        this.head.push(val.description + ': ' + val.count)
      } else {
        this.head.push(val.description)
      }
    });

    this._content.value = this.val;
    this._content.header = this.head;

    this.doughnutChartMethod();
  }

  doughnutChartMethod() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this._content.header,
        datasets: [{
          label: '',//'# of Votes'
          data: this._content.value,
          backgroundColor: hoverColor,
          hoverOffset: 8,
        }]
      },
      options: {
        hover: { mode: null },
        responsive: true,
        plugins: {
          tooltip: {
            enabled: false
          },
          legend: {
            // align: 'start',
            position: 'bottom',
            // labels: {
            //   boxWidth: 8,
            //   font: {
            //     size: 8
            //   }
            // }
          }

        }
      }
    });
    this.clear()
  }

  clear() {
    this.head = [];
    this.val = [];
  }
}