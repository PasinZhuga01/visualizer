namespace StructVisorAPI.Utils{
    export class EventTarget<T extends EventsObjectType>{
        private readonly _listeners: {[K in keyof T]: Set<T[K]>} = {} as {[K in keyof T]: Set<T[K]>};

        public addEventListener<K extends keyof T>(type: K, listener: T[K]){
            if (this._listeners[type] === undefined){
                this._listeners[type] = new Set();
            }

            this._listeners[type].add(listener);
        }

        public removeEventListener<K extends keyof T>(type: K, listener: T[K]){
            if (this._listeners[type] !== undefined){
                this._listeners[type].delete(listener);
            }
        }

        public dispatchEvent<K extends keyof T>(type: K, ...args: Parameters<T[K]>){
            for (const listener of this._listeners[type] ?? []){
                listener(...args);
            }
        }
    }
}