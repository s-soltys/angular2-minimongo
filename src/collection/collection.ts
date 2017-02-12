import { Entity } from './entity';

export type Success<T> = (result: T) => void;
export type Error = (error: any) => void;
export type Callback<T> = (success?: Success<T>, error?: Error) => void;

export interface Collection<T extends Entity> {
    find(selector?: any, options?: any): { fetch: Callback<T[]> };
    upsert(docs?: any, success?: Success<T>, error?: Error);
    remove(id: string, success?: () => void);
}