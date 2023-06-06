import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefone'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string): string {
    //1234-1234 -> 8 digitos
    //(083)1234-1234 -> 10/11 digitos
    if(value && value.length === 8){
      return `${value.substr(0,4)}-${value.substr(4,4)}`;
      }
    else if(value && value.length === 10){
      return `(${value.substr(0,2)})${value.substr(2,4)}-${value.substr(6,4)}`;
    }
    else if (value && value.length === 11){
      return `(${value.substr(0, 3)}) ${value.substr(3, 4)}-${value.substr(7)}`;
    }
    return value;
    
    }
  }


