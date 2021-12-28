import moment from 'moment';
export class Order {
  constructor(id, item, totalAmount, date) {
    this.id = id;
    this.item = item;
    this.totalAmount = totalAmount;
    this.date = date;
  }
  get Time() {
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}
