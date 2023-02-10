import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endpoints } from '@enums/endpoints.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TopicService {

    constructor(private _http: HttpClient) {}

    getTopicsBasedOnSection(sectionId: number) {
        return this._http.get(`${Endpoints.TOPICS_URL}?id_section=${sectionId}`);
    }

    patch(payload) {
        return this._http.patch(`${Endpoints.TOPICS_URL}/${payload.id}`, payload);
    }

    post(payload) {
        return this._http.post(Endpoints.TOPICS_URL, payload);
    }

    addPost(payload) {
        return this._http.post(Endpoints.POST_URL, payload);
    }
}