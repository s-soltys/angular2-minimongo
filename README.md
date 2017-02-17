# angular2-minimongo
![travis build results](https://travis-ci.org/s-soltys/angular2-minimongo.svg?branch=master)
Use minimongo in your Angular 2 app.
This package exposes the [minimongo](https://github.com/mWater/minimongo) library as an Angular2 module with providers.

# How to install:
```
$ npm install --save angular2-minimongo
```

# How to use:
## Import the Minimongo module in your bootstrap module:
```
import { MinimongoModule } from 'angular2-minimongo';

@NgModule({
    imports: [
        MinimongoModule.forRoot({ namespace: '#your-database-namespace' }),
    ]
})
export class AppModule { }
```

## Import and use the Minimongo service:
```
import { MinimongoService } from 'angular2-minimongo';

@Injectable()
export class TaskService {
  tasksCollection = this.minimongo.getCollection<Task>('tasks');

  constructor(private minimongo: MinimongoService) {

  }
}
```

## Usage: a collection object contains 3 methods:
```
// Find entities based on the standard mongo selector and objects.
find<T>(selector: any = {}, options?: any): Observable<T[]>;

// Upsert docs
upsert<T>(doc: T): Observable<T>;

// Remove documents by id
remove(id: string): Observable<void>;
```

# How to build and test:
Project is based on the angular-cli.
To run tests on this package just run:
```
ng test
```

# Roadmap:
- Implement additional and more robust collection methods
- Support IndexedDb, WebSQLDb, LocalStorageDb and MemoryDb minimongo implementation selection
