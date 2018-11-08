export class DateTimeModel {
  public date: string;
  public time: string;

  constructor()
  {
    this.date = '';
    this.time = '';
  }

  public getDateTime(): Date{
    if ((this.date == '' || this.date == null) && (this.time != '' && this.time != null ))
      this.date = new Date().toLocaleDateString("en-za");
    if ((this.time == '' || this.time == null) && (this.date != '' && this.date != null ))
      this.time = new Date().toLocaleTimeString("en-za");


    const dateTimeString = this.date + ' ' + this.time;
    const dateTime  = Date.parse(dateTimeString);
    if (isNaN(dateTime))
      return null;

    const date = new Date(dateTime);
    return date;
  }


}
