import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CanvasService } from './canva.service';

import { REPORT, DATAREPORT } from '../model/advisor-tra';

@Injectable({
  providedIn: 'root'
})
export class PdfService {


  private list: REPORT[][] = [];

  private headerColor: string = '#E92727';
  private columnsColor: string = '#ffffff';

  doc = new jsPDF();
  constructor() {

  }

  setHeaderColor(color: string) {
    this.headerColor = color;
  }

  setColumnsColor(color: string) {
    this.columnsColor = color;
  }

  setData(dataSource: DATAREPORT) {
    this.list = [];
    let _list: REPORT[] = []
    Object.entries(dataSource).forEach(([key, data]) => {
      _list = [];
      _list.push(data.idTicket);
      _list.push(data.securityTeam);
      _list.push(data.domain);
      _list.push(data.securityControl);
      _list.push(data.nistDomain);
      _list.push(data.value);
      _list.push(data.additionalTicket);
      this.list.push(_list);
    }
    );
  }


  generatePdf(header: string[][], dataSource: DATAREPORT) {
    this.doc = new jsPDF();
    this.setData(dataSource);

    this.doc.setFontSize(12);
    this.doc.text('SecurityCheck List', 12, 8);
    this.doc.setTextColor(100);
    console.log(this.list);
    (this.doc as any).autoTable({
      margin: { top: 20, left: 5, right: 5, bottom: 0 },
      styles: {
        fillColor: this.headerColor
      },
      columnStyles: {
        0: {
          fillColor: this.columnsColor
        },
        1: {
          fillColor: this.columnsColor
        },
        2: {
          fillColor: this.columnsColor
        },
        3: {
          fillColor: this.columnsColor
        },
        4: {
          fillColor: this.columnsColor
        },
        5: {
          fillColor: this.columnsColor
        },
        6: {
          fillColor: this.columnsColor
        },

      },
      head: header,
      //theme: 'grid',              
      body: this.list,
      pageBreak: 'auto'
    })
    this.list = [];
  }
  outPut() {
    // Open PDF document in browser's new tab
    this.doc.output('dataurlnewwindow')

  }

  savePdf() {
    // Download PDF doc  
    this.doc.save('securitychecklist_report.pdf');

  }
  deletePages() {
    this.doc.deletePage;
  }
}