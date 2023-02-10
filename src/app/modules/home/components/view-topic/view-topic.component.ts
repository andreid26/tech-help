import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Endpoints } from '@enums/endpoints.enum';
import { LoadingSpinnerService } from '@services/loading.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, take, takeWhile } from 'rxjs/operators';
import { UserService } from '@services/user.service';
import { TopicService } from '@services/topic.service';

@Component({
  selector: 'app-view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.scss']
})
export class ViewTopicComponent implements OnInit, OnDestroy {

  alive: boolean;
  id: number = null;
  topic = null;
  postFG: FormGroup;
  user = null;
  subscription: Subscription = null;

  posts = new BehaviorSubject<any>([]);
  isTopicInitialized = new BehaviorSubject<boolean>(false);

  constructor(private _loadingService: LoadingSpinnerService,
              private _route: ActivatedRoute,
              private _http: HttpClient,
              private _router: Router,
              private _userService: UserService,
              private _topicService: TopicService) {
    this.alive = true;
    this.postFG = new FormGroup({
      text: new FormControl('', [Validators.required , Validators.maxLength(800), Validators.minLength(5)])
    });
  }

  ngOnInit() {
    this._route.params.pipe(
      takeWhile(() => this.alive),
      take(1),
      distinctUntilChanged()
    ).subscribe((params: any) => {
      if (params && params.id) {
        this.id = params.id;
        this.getTopicDetails(this.id);
      }
    });

    this._userService.user.pipe(
      takeWhile(() => this.alive),
      take(1)
    ).subscribe(user => {
      this.user = user || null;
    });
  }

  getTopicDetails(topicId: number) {
    this._loadingService.setLoading(true);
    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this._http.get(`${Endpoints.TOPICS_URL}/${topicId}`).pipe(
      takeWhile(() => this.alive),
      take(1)
    ).subscribe((topic: any) => {
      if (!topic || !Object.keys(topic).length) {
        this._router.navigate(['/main/sections']);
      }

      this.topic = topic;
      this.posts.next((topic.posts && topic.posts.length) ? [ ...topic.posts ] : []);
      this.isTopicInitialized.next(true);
      this._loadingService.setLoading(false);
    });
  }

  getStatusIcon() {
    return this.topic.status === 'open' ? 'pi pi-unlock green-icon' : 'pi pi-lock red-icon';  
  }

  getDate(data?: any) {
    return new Date(data ? data.date : this.topic.date).toDateString();
  }

  addPost() {
    const { text } = this.postFG.getRawValue();
    const payload = {
      id_user: this.user.id,
      id_topic: this.id,
      text
    };

    this.postFG.reset();
    this._topicService.addPost(payload).pipe(
      take(1)
    ).subscribe(response => {
      if (!!response) {
        this.getTopicDetails(this.id);
      }
    });
  }

  pinPost(id: number) {
    const payload = {
      id: this.topic.id,
      pinned_post: id
    };

    this._topicService.patch(payload).pipe(
      takeWhile(() => this.alive),
      take(1)
    ).subscribe(response => {
      if (!!response) {
        this.getTopicDetails(this.topic.id);
      }
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}