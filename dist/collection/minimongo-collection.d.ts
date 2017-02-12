import { MinimongoEntity } from './minimongo-entity';
export declare type Success<T> = (result: T) => void;
export declare type Error = (error: any) => void;
export interface Callback<T> {
    (success?: Success<T>, error?: Error): any;
}
export interface MinimongoCollection<T extends MinimongoEntity> {
    find(selector?: any, options?: any): {
        fetch: Callback<T[]>;
    };
    upsert(docs?: any, success?: Success<T>, error?: Error): any;
    remove(id: string, success?: () => void): any;
}
