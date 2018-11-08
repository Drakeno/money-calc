import { Component, OnInit, HostBinding } from "@angular/core";
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { Router } from "@angular/router";
import { fadeStateTrigger } from "../shared/animations/fade.animation";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    animations: [fadeStateTrigger]
})

export class AuthComponent implements OnInit {
    @HostBinding('@fade') a = true;

    constructor(private router: Router) { }

    faCalculator = faCalculator;

    ngOnInit() {
        this.router.navigate(['/login']);
    }
}