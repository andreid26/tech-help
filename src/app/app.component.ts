import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingSpinnerService } from '@services/loading.service';
import { UserService } from '@services/user.service';
import { distinctUntilChanged, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentChecked {

  alive: boolean;
  isLoading: boolean;

  constructor(private _loadingService: LoadingSpinnerService,
              private _cdr: ChangeDetectorRef,
              private _userService: UserService) {
    this.alive = true;
    this.isLoading = false;
  }

  ngOnInit() {
    this._userService.getCurrentUser();

    this._loadingService.isLoading.pipe(
      takeWhile(() => this.alive),
      distinctUntilChanged()
    ).subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }

  ngAfterContentChecked(): void {
    this._cdr.detectChanges();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
