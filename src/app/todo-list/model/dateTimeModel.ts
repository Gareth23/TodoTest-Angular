export class DateTimeModel {
  public date: string;
  public time: string;

  constructor()
  {
    this.date = '';
    this.time = '';
  }

  public getDateTime(): Date{
    if (this.date == '' || this.date == null)
      this.date = new Date().toLocaleDateString("en-za");
    if (this.time == '' || this.time == null)
      this.time = new Date().toLocaleTimeString("en-za");

    const dateTimeString = this.date + ' ' + this.time;

    return new Date(Date.parse(dateTimeString));
  }


}
