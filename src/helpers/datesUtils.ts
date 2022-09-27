class DateUtils {
  static formatDate(date: Date): string {
    const dataFormat = new Intl.DateTimeFormat('en-UK');

    return dataFormat.format(date);
  }

  static getDatesFromText(dateString: string): string {
    try {
      const regExp = /\d{1,2}(\D)\d{1,2}\1\d{4}/g;
      const datesArray = dateString.match(regExp);

      if (datesArray) {
        const validatedDates = this.validateDates(datesArray);

        return this.getFormattedDates(validatedDates).join(', ');
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  static validateDates(dates: string[]): string[] {
    const search = /\/|-|\./g;

    function datesFilter(el: string) {
      const [day, month] = el.split('/');
      if (+day >= 1 && +day <= 31 && +month >= 1 && +month <= 12) {
        return 1;
      }
      return 0;
    }

    return dates.map((el) => el.replaceAll(search, '/')).filter(datesFilter);
  }

  static getFormattedNowDate(): string {
    const now = new Date();

    return this.formatDate(now);
  }

  static getFormattedDates(dates: string[]) {
    return dates.map((date) => {
      const [day, month, year] = date.split('/');
      const newDate = new Date(+year, +month - 1, +day);

      return this.formatDate(newDate);
    });
  }
}

export default DateUtils;
