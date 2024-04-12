import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nayaTruncate',
  standalone: true
})
export class NayaTruncatePipe implements PipeTransform {

  transform(value: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(value * factor) / factor;
  }

}
