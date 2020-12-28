import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

@Pipe({
  name: 'createdAt'
})
export class CreatedAtPipe implements PipeTransform {
  datePipe = new DatePipe('en-US');
  transform(value: CreatedAt): string {
    return this.datePipe.transform(value.seconds * 1000, 'M/d/yyyy h:mm a');
  }
}
