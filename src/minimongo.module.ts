import { MinimongoConfig } from './minimongo.config';
import { MinimongoService } from './minimongo.service';
import { MinimongoEntity } from './collection/minimongo-entity';
import { MinimongoCollection } from './collection/minimongo-collection';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

@NgModule()
export class MinimongoModule {
  static forRoot(config: MinimongoConfig): ModuleWithProviders {
    return {
      ngModule: MinimongoModule,
      providers: [
        MinimongoService,
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
  MinimongoService,
  MinimongoCollection,
  MinimongoEntity
}