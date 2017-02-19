export class MinimongoConfig {
    namespace: string;
    type: 'IndexedDb' | 'WebSQLDb' | 'LocalStorageDb' | 'MemoryDb'
}