import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords',
  standalone: true,
})
export class TruncateWordsPipe implements PipeTransform {
  transform(value: string, maxWords: number): string {
    if (!value) return '';
    const words = value.split(' ');
    if (words.length <= maxWords) return value;
    return words.slice(0, maxWords).join(' ') + '...';
  }
}
