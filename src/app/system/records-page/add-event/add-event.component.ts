import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { mergeMap } from "rxjs/operators";
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { APPEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.bodel';
import { Message } from 'src/app/shared/modules/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit, OnDestroy {
  subscription1: Subscription;
  subscription2: Subscription;

  @Input() categories: Category[] = [];
  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];

  message: Message;

  constructor(private eventsService: EventsService,
    private billService: BillService) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  onSubmit(form: NgForm) {
    let { amount, description, category, type } = form.value;
    let date = moment().format('DD.MM.YYYY HH:mm:ss');
    console.log(date)
    if (amount < 0) amount *= -1;

    const event = new APPEvent(type, amount, +category, date, description);

    this.subscription1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value: number = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage(`На счету недостаточно средств! Вам не хватает ${amount - bill.value}`);
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.subscription2 = this.billService.updateBill({ value, currency: bill.currency })
          .pipe(mergeMap(() => this.eventsService.addEvent(event)))
          .subscribe(() => {
            form.setValue({
              amount: 0,
              description: ' ',
              category: 1,
              type: 'outcome'
            });
          });
      });
    // this.eventsService.addEvent(event);
  }

  ngOnDestroy() {
    if (this.subscription1) this.subscription1.unsubscribe();
    if (this.subscription2) this.subscription2.unsubscribe();
  } 

}
