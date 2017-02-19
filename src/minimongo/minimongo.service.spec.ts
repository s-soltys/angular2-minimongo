import { ObservableCollection } from './observable-collection';
import { Observable } from 'rxjs/Rx';
/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { Minimongo } from './minimongo.service';
import { MinimongoConfig } from './minimongo.config';

interface TestEntity {
  _id?: string;
  name: string;
  value: number;
  tags?: (string | number)[];
}

describe('MinimongoService', () => {
  let _minimongo: Minimongo;
  let _collection: ObservableCollection<TestEntity>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Minimongo, { provide: MinimongoConfig, useValue: { namespace: 'test-db', type: 'MemoryDb' } }]
    });
  });

  beforeEach(inject([Minimongo], (minimongo: Minimongo) => {
    _minimongo = minimongo;
    _collection = minimongo.getCollection<TestEntity>('test');
  }));

  it('should be instantiable', () => {
    expect(_minimongo).not.toBeNull();
  });
  
  it('should create collections', () => {
    expect(_collection).not.toBeNull();
  });

  it('upsert, find and remove a single entity', done => {
    let eOriginal: TestEntity = { name: 'xxx', value: 123, tags: ['a', 2, 'c'] };
    let eSaved: TestEntity;
    let eRetrieved1: TestEntity;
    let eRetrieved2: TestEntity;
    let deleteResult: any;
    let eRetrievedAfterDelete: TestEntity;

    _collection
      .upsert(eOriginal)
        .do(o => eSaved = o)
      .switchMap(o => _collection.findOne({ _id: o._id }))
        .do(o => eRetrieved1 = o)
      .switchMap(o => _collection.findOne(o._id))
        .do(o => eRetrieved2 = o)
      .switchMap(o => _collection.remove(o._id))
        .do(o => deleteResult = o)
      .switchMap(o => _collection.findOne({ _id: eSaved._id }))
        .do(o => eRetrievedAfterDelete = o)
      .subscribe(_ => {
        expect(eSaved).toEqual(eOriginal);
        expect(eRetrieved1).toEqual(eOriginal);
        expect(eRetrieved2).toEqual(eOriginal);
        expect(deleteResult).toBeUndefined();
        expect(eRetrievedAfterDelete).toBeNull();
        done();
      });
  });

  it('upsert, find and remove a multiple entities', done => {
    let eOriginal: TestEntity = { name: 'xxx', value: 123, tags: ['a', 2, 'c'] };
    let eSaved: TestEntity;
    let eRetrieved1: TestEntity;
    let eRetrieved2: TestEntity;
    let deleteResult: any;
    let eRetrievedAfterDelete: TestEntity;

    _collection
      .upsert(eOriginal)
        .do(o => eSaved = o)
      .switchMap(o => _collection.findOne({ _id: o._id }))
        .do(o => eRetrieved1 = o)
      .switchMap(o => _collection.findOne(o._id))
        .do(o => eRetrieved2 = o)
      .switchMap(o => _collection.remove(o._id))
        .do(o => deleteResult = o)
      .switchMap(o => _collection.findOne({ _id: eSaved._id }))
        .do(o => eRetrievedAfterDelete = o)
      .subscribe(_ => {
        expect(eSaved).toEqual(eOriginal);
        expect(eRetrieved1).toEqual(eOriginal);
        expect(eRetrieved2).toEqual(eOriginal);
        expect(deleteResult).toBeUndefined();
        expect(eRetrievedAfterDelete).toBeNull();
        done();
      });
  });
});
