import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, interval, Observable, Subscription, timer } from 'rxjs';
import { UserService } from './user.service';
import { take, skip, map, tap, switchMap } from 'rxjs/operators';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  [x: string]: any;
  UserActivated = false;
  private activedSub: Subscription;

  userRegistrationForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {}
  ngOnDestroy(): void {
    this.activedSub.unsubscribe();
  }

  submitEmail() {
    console.warn(this.userRegistrationForm.get('email').value);
    alert('Is Email valid: ' + this.userRegistrationForm.get('email').valid);
  }

  get email() {
    return this.userRegistrationForm.get('email');
  }

  ngOnInit(): void {
    this.userRegistrationForm = this.fb.group({
      email: [
        'martin.rivas✍@biberk.com',
        [Validators.required, Validators.email],
      ],
    });

    // First version
    // const unsubscribeAfter = 3001;

    // const subs = interval(1000).subscribe((n) => {
    //   console.log(n);
    // });

    // setTimeout(() => subs.unsubscribe(), unsubscribeAfter);
    // https://blog.angular-university.io/rxjs-higher-order-mapping/
    // debugger;
    // const http$: Observable<any> = this.http('http://localhost:4200/');
    // http$
    //   .pipe(
    //     tap(() => console.log('HTTP request executed')),
    //     map((res) => Object.values(res['payload']))
    //   )
    //   .subscribe((courses) => console.log('courses'));

    // fromEvent(document, 'click')
    //   .pipe(
    //     // restart counter on every click
    //     switchMap(() => interval(1000))
    //   )
    //   .subscribe(console.log);

    interval(1000)
      .pipe(
        /*skip(5),*/
        take(5),
        map((n) => n * 2)
      )
      .subscribe((n) => console.log(n));

    //throw new Error('Method not implemented.');
    this.activedSub = this.userService.activatedEmitter.subscribe(
      (deactivated) => {
        //this.UserActivated = deactivated;
        alert(deactivated);
      }
    );
  }
}
