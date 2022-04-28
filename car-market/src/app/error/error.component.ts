import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent {
  errorMessage: string | undefined;
  queryParams: Observable<Params> | undefined;
  constructor(private activatedRoute: ActivatedRoute) {
    this.queryParams = this.activatedRoute.params;
    this.errorMessage = this.activatedRoute.snapshot.queryParams['msg'];
  }
}
