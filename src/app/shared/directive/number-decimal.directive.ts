import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberDecimal]'
})
export class NumberDecimalDirective {

  private regex: RegExp = new RegExp(/^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)$/g);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home', 'ArrowRight', 'ArrowLeft'];

  constructor(private el: ElementRef) { }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    let current: string = this.el.nativeElement.value;
    let next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
