import { Observable, Subscriber } from 'rxjs/Rx';
import { Entity } from './entity';

export interface ObservableCollection<T> {
    findOne(id: string): Observable<T>;
    findOne(selector: any, options?: any): Observable<T>;
    find(selector?: any, options?: any): Observable<T[]>;
    upsert(docs: T): Observable<T>;
    upsert(docs: T[]): Observable<T[]>;
    remove(id: string): Observable<void>;
}

export class MinimongoObservableCollection<T extends Entity> implements ObservableCollection<T> {
    constructor(private collection) { }

    findOne(selector: any, options?: any): Observable<T> {
        let subscription = (observer: Subscriber<T>) => {
            let successCallback = result => {
                observer.next(result);
                observer.complete();
            };
            let errorCallback = error => observer.error(error);

            if (typeof selector === 'string'){
                selector = { _id: selector };
            }

            this.collection.findOne(selector, options, successCallback, errorCallback);
        };

        return new Observable(subscription);
    }

    find(selector: any = {}, options?: any): Observable<T[]> {
        let subscription = (observer: Subscriber<T[]>) => {
            let successCallback = result => {
                observer.next(result);
                observer.complete();
            };
            let errorCallback = error => observer.error(error);

            this.collection.find(selector, options).fetch(successCallback, errorCallback);
        };

        return new Observable(subscription);
    }

    upsert(doc: T | T[]): Observable<T | T[]> {
        let subscription = (observer: Subscriber<T>) => {
            let successCallback = result => {
                observer.next(result);
                observer.complete();
            };
            let errorCallback = error => observer.error(error);

            this.collection.upsert(doc, successCallback, errorCallback);
        };

        return new Observable(subscription);
    }

    remove(id: string): Observable<void> {
        let subscription = (observer: Subscriber<void>) => {
            let successCallback = result => {
                observer.next(result);
                observer.complete();
            };
            let errorCallback = error => observer.error(error);

            this.collection.remove(id, successCallback, errorCallback);
        };

        return new Observable(subscription);
    }
}