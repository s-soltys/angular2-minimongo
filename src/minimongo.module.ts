import { MinimongoConfig } from './minimongo/minimongo.config';
import { Minimongo } from './minimongo/minimongo.service';
import { Entity } from './minimongo/entity';
import { ObservableCollection } from './minimongo/observable-collection';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

@NgModule()
export class MinimongoModule {
  static forRoot(config: MinimongoConfig): ModuleWithProviders {
    return {
      ngModule: MinimongoModule,
      providers: [
        Minimongo,
        { provide: MinimongoConfig, useValue: config }
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: MinimongoModule) {
    if (parentModule) {
      throw new Error(`MinimongoModule is already loaded. Import it in the root module only.`);
    }
  }
}

export {
  MinimongoConfig,
  Minimongo,
  Entity,
  ObservableCollection
}
