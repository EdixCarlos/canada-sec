import { Injectable } from '@angular/core';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXTENTION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  public worksheet: XLSX.WorkSheet = null;

  constructor() { }

  export(array: any[], filename: string): void {
    this.worksheet = XLSX.utils.aoa_to_sheet(array);

    this.setStyles();
    
    const workbook: XLSX.WorkBook = { 
      Sheets: { 'sheet_1': this.worksheet },
      SheetNames: ['sheet_1']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array'});
    this.saveAsExcel(excelBuffer, filename);
  }

  private saveAsExcel(buffer: any, filename: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, this.getFileName(filename));
  }

  private setStyles() {
    const range = XLSX.utils.decode_range(this.worksheet['!ref']);
    let wscols = null;

    // this.setHeaderStyles(range, 1);

    wscols = [{ wch: 10 },{ wch: 45 },{ wch: 20 },{ wch: 25 }, { wch: 35 }, { wch: 50 }];

    //set column width
    this.worksheet['!cols'] = wscols;
    //set row height
    this.worksheet['!rows'] = [{ hpx: 13.2 }];

  }

  // private setHeaderStyles(range: any, numOfHeaders: number){
  //   let i=0;
  //   for (let C = range.s.c; C <= range.e.c; ++C) {
  //     i=0;
  //     while(i<numOfHeaders){//Set header styles
  //       const header1 = XLSX.utils.encode_cell({c: C, r: i});
  //       this.worksheet[header1].s = {
  //         fill: {fgColor: {rgb: "D3D3D3"}},
  //         font: {name: 'Arial', sz:50, bold: true},
  //         alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' }
  //       };
  //       i++;
  //     }
  //   }
  //   //set general cell style
  //   for (let R = range.s.r + i; R <= range.e.r; ++R) {
  //     for (let C = range.s.c; C <= range.e.c; ++C) {
  //       const all = XLSX.utils.encode_cell({c: C, r: R});
  //       if(this.worksheet[all]){
  //         this.worksheet[all].s = this.generalStyle;
  //       }
  //     }
  //   }
  // }

  // private setDateFmt(cell: any){
  //   if(this.worksheet[cell] && this.worksheet[cell].v !== ''){
  //     this.worksheet[cell].t = 'd';
  //     this.worksheet[cell].z = {
  //       font: {name: 'Arial', sz:10, bold: true},
  //       alignment: { wrapText: false, vertical: 'bottom', horizontal: 'center' }
  //     };
  //     this.worksheet[cell].s = {
  //       font: {name: 'Arial', sz:10, bold: true},
  //       alignment: { wrapText: false, vertical: 'bottom', horizontal: 'center' }
  //     };
  //   }
  // }

  private getFileName(fileName: string): string {
    const today: Date = new Date();
    const month = today.getMonth()+1;
    return fileName + '_' + today.getFullYear() + '_' +
      month + '_' + today.getDate() + '_' + Date.now() + EXCEL_EXTENTION;
  }
}
