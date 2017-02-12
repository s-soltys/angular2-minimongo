import { ObservableCollection } from './collection/observable-collection';
import { Collection } from './collection/collection';
import { MinimongoConfig } from './minimongo.config';
import { Inject, Injectable } from '@angular/core';

declare const require: (name: string) => any;
const minimongo = require('minimongo');

@Injectable()
export class MinimongoService {
    private db;

    constructor(private config: MinimongoConfig) {
        this.db = new minimongo.LocalStorageDb({ namespace: config.namespace });
    }

    get database() {
        return this.db;
    }

    getCollection<T>(collectionName: string): ObservableCollection<T> {
        if (!this.db.collections[collectionName]) {
            this.db.addCollection(collectionName);
        }

        const collection = this.db.collections[collectionName] as Collection<T>;

        const observableCollection = new ObservableCollection(collection);

        return observableCollection;
    }
}