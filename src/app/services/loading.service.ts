import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

    public isLoading: EventEmitter<boolean> = new EventEmitter();

    constructor() {
        this.isLoading.next(false);
    }

    setLoading(loading: boolean) {
        this.isLoading.next(loading);
    }
}