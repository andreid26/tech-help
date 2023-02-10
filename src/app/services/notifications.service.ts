import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _messageService: MessageService) { }

  handleError(error: any) {
    if(typeof error.error === 'string') {
      error.error = JSON.parse(error.error);
    }
    const { errorMessage } = error.error;
    return this.createMessage('error', 'Error', errorMessage);
  }

  createMessage(type:string, summary:string, message: string) {
    this._messageService.add({severity: type, summary: summary, detail: message});
    setTimeout(() => {
      this._messageService.clear();
    }, 2000);
  }
}