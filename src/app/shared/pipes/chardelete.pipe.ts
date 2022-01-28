import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chardelete'
})
export class ChardeletePipe implements PipeTransform {

  transform(value: any ,args?: any): any {
    return args.replace(/[&\/\\|#,+()$~%.'":*?<>{}]/g, '');
  }
  
}
