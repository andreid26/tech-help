import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingSpinnerService } from '@services/loading.service';
import { NotificationsService } from '@services/notifications.service';
import { TopicService } from '@services/topic.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-topic-dialog',
  templateUrl: './add-topic-dialog.component.html',
  styleUrls: ['./add-topic-dialog.component.scss']
})
export class AddTopicDialogComponent implements OnInit, OnDestroy {

  @Input() sectionId = null;
  @Input() userId = null;
  @Input() sectionName = null;
  @Output() onCloseDialog = new EventEmitter<any>();

  alive: boolean;
  addTopicFG: FormGroup;
  submitButtonClicked = false;
 
  constructor(private _loadingService: LoadingSpinnerService,
              private _topicService: TopicService,
              private _notificationsService: NotificationsService) {
    this.alive = true;
    this.addTopicFG = new FormGroup({
      title: new FormControl('', [Validators.required , Validators.maxLength(50), Validators.minLength(5)]),
      text: new FormControl('', [Validators.required , Validators.maxLength(1000), Validators.minLength(10)])
    });
  }

  get title(): FormControl {
    return this.addTopicFG.get('title') as FormControl;
  }

  get text(): FormControl {
    return this.addTopicFG.get('text') as FormControl;
  }

  ngOnInit(): void { }

  closeDialog() {
    this.onCloseDialog.emit({ visible: false });
  }

  addTopic() {
    const { title, text } = this.addTopicFG.getRawValue();
    const payload = {
      id_user: this.userId,
      id_section: this.sectionId,
      title,
      text
    };
    this._loadingService.setLoading(true);
    this._topicService.post(payload).pipe(
      take(1)
    ).subscribe((response: any) => {
      this._loadingService.setLoading(false);

      if (response && response.id) {
        this._notificationsService.createMessage('success', 'Topic', 'Topic successfully added');
        this.onCloseDialog.emit({ visible: false, refreshData: true });
      }
    });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
