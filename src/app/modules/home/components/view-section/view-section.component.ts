import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoints } from '@enums/endpoints.enum';
import { LoadingSpinnerService } from '@services/loading.service';
import { TopicService } from '@services/topic.service';
import { UserService } from '@services/user.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, take, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.scss']
})
export class ViewSectionComponent implements OnInit, OnDestroy {

  alive: boolean;
  id: number = null;
  section = null;
  user = null;
  subscription: Subscription = null;
  isSectionInitialized = new BehaviorSubject<boolean>(false);
  topics = new BehaviorSubject<any>([]);
  isDialogVisible = new BehaviorSubject<boolean>(false);

  constructor(private _loadingService: LoadingSpinnerService,
              private _route: ActivatedRoute,
              private _topicService: TopicService,
              private _http: HttpClient,
              private _router: Router,
              private _userService: UserService) {
    this.alive = true;
  }

  ngOnInit() {
    this._route.params.pipe(
      takeWhile(() => this.alive),
      take(1),
      distinctUntilChanged()
    ).subscribe((params: any) => {
      if (params && params.id) {
        this.id = params.id;
        this.getSectionDetails(this.id);
        this.getSectionTopics(this.id);
      }
    });

    this._userService.user.pipe(
      takeWhile(() => this.alive),
      take(1)
    ).subscribe(user => {
      this.user = user || null;
    });
  }

  getSectionDetails(sectionId: number) {
    this._http.get(`${Endpoints.SECTIONS_URL}/${sectionId}`).pipe(
      takeWhile(() => this.alive),
      take(1)
    ).subscribe((section: any) => {
      if (!section || !Object.keys(section).length) {
        this._router.navigate(['/main/sections']);
      }

      this.section = section;
      this.isSectionInitialized.next(true);
    });
  }

  getSectionTopics(sectionId: number) {
    this._loadingService.setLoading(true);
    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this._topicService.getTopicsBasedOnSection(sectionId).pipe(
      takeWhile(() => this.alive),
      distinctUntilChanged()
    ).subscribe((topics: any) => {
      this.topics.next(topics ? topics.entry : []);
      this._loadingService.setLoading(false);
    });
  }

  getStatusIcon(topic) {
    return topic.status === 'open' ? 'pi pi-unlock green-icon' : 'pi pi-lock red-icon';  
  }

  getDate(topic) {
    return new Date(topic.date).toDateString();
  }

  viewTopic(id: number) {
    this._router.navigate([`/main/topics/${id}`]);
  }

  showAddTopicDialog() {
    this.isDialogVisible.next(true);
  }

  closeDialog(event) {
    this.isDialogVisible.next(event.visible);
    
    if (event && event.refreshData) {
      this.getSectionTopics(this.id);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }
}