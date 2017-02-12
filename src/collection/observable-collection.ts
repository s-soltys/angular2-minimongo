import { Collection } from './collection';
import { Observable, Subscriber } from 'rxjs/Rx';

export class ObservableCollection<T> {
    constructor(private collection: Collection<T>) {

    }

    find(selector: any = {}, options?: any): Observable<T[]> {
        return new Observable<T[]>((subscriber: Subscriber<T[]>) => {
            this.collection.find(selector, options).fetch(tasks => {
                subscriber.next(tasks);
                subscriber.complete();
            });
        });
    }

    upsert(doc: T): Observable<T> {
        return new Observable<T>((subscriber: Subscriber<T>) => {
            this.collection.upsert(doc, response => {
                subscriber.next(response);
                subscriber.complete();
            });
        });
    }

    remove(id: string): Observable<void> {
        return new Observable<void>((subscriber: Subscriber<void>) => {
            this.collection.remove(id, () => {
                subscriber.next();
                subscriber.complete();
            });
        });
    }
}