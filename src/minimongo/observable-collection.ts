import { Observable, Subscriber } from 'rxjs/Rx';
import { Entity } from './entity';

export class ObservableCollection<T extends Entity> {
    constructor(private collection) { }

    find(selector: any = {}, options?: any): Observable<T[]> {
        const subscription = (observer: Subscriber<T[]>) => {
            this.collection.find(selector, options).fetch(tasks => {
                observer.next(tasks);
                observer.complete();
            });
        };

        return new Observable(subscription);
    }

    upsert(doc: T): Observable<T> {
        const subscription = (observer: Subscriber<T>) => {
            this.collection.upsert(doc, response => {
                observer.next(response);
                observer.complete();
            });
        };

        return new Observable(subscription);
    }

    remove(id: string): Observable<void> {
        const subscription = (observer: Subscriber<void>) => {
            this.collection.remove(id, () => {
                observer.next();
                observer.complete();
            });
        };

        return new Observable(subscription);
    }
}