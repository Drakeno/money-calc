import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from 'src/app/shared/services/users.service';
import { User } from 'src/app/shared/modules/user.model';
import { Message } from 'src/app/shared/modules/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersServise: UserService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Вход в систему | Калькулятор расходов');
    meta.addTags([
      {name: 'keywords', content: 'логин, вход в систему, калькулятор расходов'},
      {name: 'description', content: 'Страница входа в систему учета расходов'}
    ]);
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage('Теперь вы можете войти в систему', 'success');
      } else if (params['accessDenied']) {
        this.showMessage('Для работы с системой вам нужно войти', 'warning');
      }
    });

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000)
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersServise.getUserByEmal(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message.text = '';
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/system', 'bill']);
          } else {
            this.showMessage('Пароль неверный');
          }

        } else {
          this.showMessage('Такого пользователя не существует');
        }
      });
  }
}
