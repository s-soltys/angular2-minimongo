import { ObservableCollection } from './observable-collection';
import { MinimongoConfig } from './minimongo.config';
import { Inject, Injectable } from '@angular/core';
import { Entity } from './entity';
import minimongo from './minimongo.loader';

@Injectable()
export class Minimongo {
    private readonly db;

    constructor(private config: MinimongoConfig) {
        const dbConstructor = minimongo[config.type];
        this.db = new dbConstructor({ namespace: config.namespace });
    }

    get database() {
        return this.db;
    }

    getCollection<T extends Entity>(name: string): ObservableCollection<T> {
        if (!this.db.collections[name]) {
            this.db.addCollection(name);
        }

        const collection = this.db.collections[name];

        const observableCollection = new ObservableCollection(collection);

        return observableCollection;
    }
    
}