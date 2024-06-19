// tab-SectionsComponent.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-tabs-section',
    templateUrl: './tabs-section.component.html',
    styleUrls: ['./tabs-section.component.css']
})
export class TabsSectionComponent implements OnInit {
    @Input() fromDate: string;
    @Input() toDate: string;

    page = 2;
    page1 = 3;
    active = 1;
    active1 = 1;
    active2 = 1;

    activeTab: string = 'COMPLETED';
    filteredTransactions: any[] = [];
    transactions: any[] = [];
    transactionDetails: any = {};


    constructor(private http: HttpClient) { }

    ngOnInit() {
        // Listen to the 'transactionsFetched' event dispatched by HomeComponent
        window.addEventListener('transactionsFetched', (event: CustomEvent) => {
            this.transactions = event.detail;
            this.filteredTransactions = event.detail;
            console.log('------- Initial filteredTransactions:', this.filteredTransactions);        });
    }


    filterTransactions(status1: string) {
        this.filteredTransactions = this.transactions.filter(transaction => transaction.status === status1);
        console.log('----------' , status1)
        // .filter(transaction => {
        //     // Replace 'status' with your actual filter criteria (e.g., 'COMPLETED', 'REJECTED')
        //     return transaction.status === 'COMPLETED';
        // });
    }




    loadTransactionDetails(transactionId: number) {
        this.http.get<any>(`http://localhost:3001/api/transactions/${transactionId}`).subscribe(
            (response) => {
                this.transactionDetails = response; // Assuming response is in JSON format
            },
            (error) => {
                console.error('Failed to fetch transaction details', error);
            }
        );
    }

}
