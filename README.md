# angular2-minimongo
[![Build Status](https://travis-ci.org/s-soltys/angular2-minimongo.svg?branch=master)](https://travis-ci.org/s-soltys/angular2-minimongo)

Use minimongo in your Angular 2 app.
This package exposes the [minimongo](https://github.com/mWater/minimongo) library as an Angular2 module with providers.

# How to install:
```
$ npm install --save angular2-minimongo
```

# How to use:
### Import the Minimongo module in your bootstrap module:
```typescript
import { MinimongoModule } from 'angular2-minimongo';

@NgModule({
    imports: [
        MinimongoModule.forRoot({ namespace: '#your-database-namespace' }),
    ]
})
export class AppModule { }
```

### Import and use the Minimongo service:
```typescript
import { MinimongoService } from 'angular2-minimongo';

@Injectable()
export class TaskService {
  tasksCollection = this.minimongo.getCollection<Task>('tasks');

  constructor(private minimongo: MinimongoService) {

  }
}
```

### Usage: the collection interface
```typescript
/*
Types are the best documentation.
Collections provided by the Minimongo service implement the ObservableCollection interface.
Parameters named selector and docs are standard mongo selectors.
*/
export interface ObservableCollection<T> {
    findOne(id: string): Observable<T>;
    findOne(selector: any, options?: any): Observable<T>;
    find(selector?: any, options?: any): Observable<T[]>;
    upsert(doc: T): Observable<T>;
    upsert(docs: T[]): Observable<T[]>;
    remove(id: string): Observable<void>;
}
```

# How to build and test:
Project is based on the angular-cli.
To run tests on this package just run:
```
ng test
```

# Roadmap:
- Implement additional and more robust collection methods
