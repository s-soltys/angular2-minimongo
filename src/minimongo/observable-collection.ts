import { Observable, Subscriber } from 'rxjs/Rx';
import { Entity } from './entity';

export interface ObservableCollection<T> {
    findOne(id: string): Observable<T>;
    findOne(selector: any, options?: any): Observable<T>;
    find(selector?: any, options?: any): Observable<T[]>;
    upsert(doc: T): Observable<T>;
    upsert(docs: T[]): Observable<T[]>;
    remove(id: string): Observable<void>;
}

export class MinimongoObservableCollection<T extends Entity> implements ObservableCollection<T> {
    constructor(private collection) { }

    findOne(selector: any, options?: any): Observable<T> {
        return createSource<T>((success, error) => {
            if (typeof selector === 'string') {
                selector = { _id: selector };
            }

            this.collection.findOne(selector, options, success, error);
        });
    }

    find(selector: any = {}, options?: any): Observable<T[]> {
        return createSource<T[]>((success, error) => {
            this.collection.find(selector, options).fetch(success, error);
        });
    }

    upsert(doc: T | T[]): Observable<T | T[]> {
        return createSource<T | T[]>((success, error) => {
            this.collection.upsert(doc, success, error);
        });
    }

    remove(id: string): Observable<void> {
        return createSource<void>((success, error) => {
            this.collection.remove(id, success, error);
        });
    }

}

interface ExecActions<T> {
    (successCallback: (result: T) => void, errorCallback: (error: Error) => void): void;
}

function createSource<T>(exec: ExecActions<T>): Observable<T> {
    const source = new Observable((observer: Subscriber<T>) => {
        const successCallback = (result: T) => {
            observer.next(result);
            observer.complete();
        };

        const errorCallback = (error: Error) => {
            observer.error(error);
        };

        exec(successCallback, errorCallback);
    });

    return source;
}