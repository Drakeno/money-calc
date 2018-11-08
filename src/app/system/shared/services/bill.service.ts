import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Bill } from "../models/bill.bodel";
import { BaseApi } from "src/app/shared/core/base-api";

@Injectable()
export class BillService extends BaseApi {
    accessKey = 'd8e893bdb4f0741d880a015569ae28ce';

    constructor(public http: Http) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    updateBill(bill: Bill): Observable<Bill> {
        return this.put('bill', bill);
    }

    getCurrency(base: string = 'RUB'): Observable<any> {
        return this.http.get(`https://api.exchangeratesapi.io/latest?base=RUB`)
            .pipe(map((response: Response) => response.json()));
    }
}