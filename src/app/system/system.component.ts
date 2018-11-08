import { Component, HostBinding } from "@angular/core";
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { fadeStateTrigger } from "../shared/animations/fade.animation";

@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    animations: [fadeStateTrigger]
})

export class SystemComponent {
    faCalculator = faCalculator;
    @HostBinding('@fade') a = true;
}