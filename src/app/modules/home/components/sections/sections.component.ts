import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Endpoints } from '@enums/endpoints.enum';
import { LoadingSpinnerService } from '@services/loading.service';
import { BehaviorSubject, take, takeWhile } from 'rxjs';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit, OnDestroy {

  alive: boolean;
  sections = new BehaviorSubject<any>([]);

  constructor(private _http: HttpClient,
              private _loadingService: LoadingSpinnerService) {
    this.alive = true;
    this._loadingService.setLoading(true);
  }

  ngOnInit() {
    this._http.get(Endpoints.SECTIONS_URL).pipe(
      takeWhile(() => this.alive),
      take(1)
    ).subscribe((sections: any) => {
      this._loadingService.setLoading(false);
      this.sections.next(sections && sections.entry || []);
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}