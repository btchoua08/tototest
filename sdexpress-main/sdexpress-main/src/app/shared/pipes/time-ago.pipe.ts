import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  timeDiffs = {
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 7 * 24 * 60 * 60 * 1000,
    year: 365 * 24 * 60 * 60 * 1000
  };

  transform(value: string | null): string {
    if (value) {
      const currentDate = Date.now();
      const dateVal = new Date(value).getTime();
      const timeDifference = currentDate - dateVal;
      if (timeDifference < this.timeDiffs.minute) {
        return 'Il y a quelques secondes';
      } else if (timeDifference < this.timeDiffs.hour) {
        return 'Il y a quelques minutes';
      } else if (timeDifference < this.timeDiffs.day) {
        return 'Il y a quelques heures';
      } else if (timeDifference < this.timeDiffs.week) {
        return 'Il y a quelques jours';
      } else if (timeDifference < this.timeDiffs.month) {
        return 'Il y a quelques semaines';
      } else if (timeDifference < this.timeDiffs.year) {
        return 'Il y a quelques mois';
      } else {
        return 'Il y a plus d\'un an';
      }
    } else {
      return '';
    }
  }
}
