import { MinimongoConfig } from './minimongo.config';
import { MinimongoCollection } from './collection/minimongo-collection';
export declare class MinimongoService {
    private config;
    private db;
    constructor(config: MinimongoConfig);
    readonly database: any;
    getCollection<T>(collectionName: string): MinimongoCollection<T>;
}
