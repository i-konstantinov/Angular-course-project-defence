import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ErrorsService } from './error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit {
  showErrorMessage = false;
  errors$: Observable<string[]> | undefined;
  
  queryParams: Observable<Params> | undefined;
  
  constructor(
    private router: Router,
    public errorsService: ErrorsService,
    ) { }
  
  ngOnInit(): void {
    this.errors$ = this.errorsService.errors$.pipe(
      tap(() => this.showErrorMessage = true)
    )
  }

  onClose() {
    this.showErrorMessage = false;
    this.router.navigate(["/catalog"]);
  }
}
