import { Directive, HostListener } from '@angular/core';
import { RegExpresion } from '../constants';

@Directive({
  selector: '[appEmail]'
})
export class EmailDirective {

  constructor() { }
  private checkPattern(value: string) {
    return String(value).match(new RegExp(RegExpresion.EMAIL.caracteres));
  }
  private specialKeys = RegExpresion.EMAIL.caracteresEspeciales;

  @HostListener('keypress', ['$event']) onkeypress(event: KeyboardEvent) {
    if (!this.checkPattern(event.key) || this.specialKeys.indexOf(event.code)!==-1) {
      event.preventDefault();
    }
  }

  @HostListener('paste', ['$event']) onpaste(event: ClipboardEvent) {
    const pasteValue = event.clipboardData.getData('text');

    Array.from(pasteValue).forEach(key => {
      if (!this.checkPattern(key) && this.specialKeys.indexOf(key)!==-1) {
        event.preventDefault();
        return;
      }
    });
  }
}
