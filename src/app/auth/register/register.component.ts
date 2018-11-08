import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/modules/user.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeStateTrigger]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private title: Title
      ) { 
    title.setTitle('Регистрация | Калькулятор расходов');
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.checkExistingEmail.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(4)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(false, [Validators.required, Validators.requiredTrue])
    });
  }

  onSubmit() {
    const { email, password, name } = this.form.value;
    const user = new User(email, password, name);
    this.userService.createNewUser(user)
      .subscribe((user: User) => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true
          }
        })
      })
  }

  checkExistingEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getUserByEmal(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({ existingEmail: true })
          } else {
            resolve(null);
          }
        })
    });
  }

}
