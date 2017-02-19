/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Minimongo } from './minimongo.service';
import { MinimongoConfig } from './minimongo.config';

describe('MinimongoService', () => {
  beforeEach(() => {
    let config: MinimongoConfig = { namespace: 'test-db', type: 'MemoryDb' };
    TestBed.configureTestingModule({
      providers: [
        Minimongo,
        { provide: MinimongoConfig, useValue: config }
      ]
    });
  });

  it('should be instantiable', inject([Minimongo], (service: Minimongo) => {
    expect(service).toBeTruthy();
  }));

  it('should create collections', inject([Minimongo], (service: Minimongo) => {
    let col = service.getCollection('test');
    expect(col).toBeTruthy();
  }));

  it('upsert and retrieve', inject([Minimongo], (service: Minimongo) => {
    let col = service.getCollection<any>('test');

    col
      .upsert({ name: 'xxx' })
      .switchMap(_ => col.find({}))
      .subscribe(results => {
        expect(results.length).toBe(1);
        expect(results[0].name).toBe('xxx');
      });
  }));
});
