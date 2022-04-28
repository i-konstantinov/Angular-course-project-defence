import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent {
  errorMessage: string | undefined;
  constructor(private activatedRoute: ActivatedRoute) {
    this.errorMessage = this.activatedRoute.snapshot.queryParams['msg'];
  }
}
