import { MinimongoConfig } from './minimongo.config';
import { MinimongoService } from './minimongo.service';
import { MinimongoEntity } from './collection/minimongo-entity';
import { MinimongoCollection } from './collection/minimongo-collection';
import { ModuleWithProviders } from '@angular/core';
export declare class MinimongoModule {
    static forRoot(config: MinimongoConfig): ModuleWithProviders;
    constructor(parentModule: MinimongoModule);
}
export { MinimongoConfig, MinimongoService, MinimongoCollection, MinimongoEntity };
