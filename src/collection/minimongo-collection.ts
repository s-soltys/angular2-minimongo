import { MinimongoEntity } from './minimongo-entity';

export type Success<T> = (result: T) => void;
export type Error = (error: any) => void;
export interface Callback<T> {
    (success?: Success<T>, error?: Error);
}

export interface MinimongoCollection<T extends MinimongoEntity> {
    find(selector?: any, options?: any): { fetch: Callback<T[]> };
    upsert(docs?: any, success?: Success<T>, error?: Error);
    remove(id: string, success?: () => void);
}