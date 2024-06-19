import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  model = {
    left: true,
    middle: false,
    right: false
  };

  focus;
  focus1;

  fromDate: string;
  toDate: string;

  transactions = [];
  filteredTransactions = this.transactions;

  constructor(private transactionService: TransactionService) {
    this.setDefaultValues();
   }

   setDefaultValues() {
    // Default fromDate to '01-01-2020'
    const defaultFromDate = new Date('2020-01-01');
    this.fromDate = formatDate(defaultFromDate, 'yyyy-MM-dd', 'en-US');

    // Default toDate to today's date
    const today = new Date();
    this.toDate = formatDate(today, 'yyyy-MM-dd', 'en-US');
  }


  ngOnInit() { }

  searchTransactions() {
    console.log(`Fetching transactions from ${this.fromDate} to ${this.toDate}`);
    this.transactionService.getTransactions(this.fromDate, this.toDate).subscribe((data: any) => {
      console.log('Data fetched from API:', data);
      this.filteredTransactions = data;
      this.passDataToSections(data);
    });
  }

  passDataToSections(data: any) {
    console.log('Dispatching transactionsFetched event with data1:', data);
    const event = new CustomEvent('transactionsFetched', { detail: data });
    console.log('Dispatching transactionsFetched event with data2:', data);
    window.dispatchEvent(event);
  }
}
