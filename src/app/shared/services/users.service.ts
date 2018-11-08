import { Http, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { User } from "../modules/user.model";
import { BaseApi } from "../core/base-api";

@Injectable()

export class UserService extends BaseApi {
    constructor(public http: Http) {
        super(http);
    }

    getUserByEmal(email: string): Observable<User> {
        return this.get(`users?email=${email}`)
            .pipe(map((users: User[]) => users[0] ? users[0] : undefined));
    }

    createNewUser(user: User): Observable<User> {
        return this.post('users', user);
    }
}