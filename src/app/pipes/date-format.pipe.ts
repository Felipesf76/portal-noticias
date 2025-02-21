import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return ''; // Manejo de valores vacíos

    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Asegura 2 dígitos
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  
  }
}
