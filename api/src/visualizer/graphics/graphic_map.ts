namespace StructVisorAPI.Visualizer.Graphics{
    export class GraphicMap<K, V extends BaseGraphic<IBaseGraphicOptions>>{
        private readonly _set: Set<V>;
        private readonly _map: Map<K, V>;

        private readonly _eventTarget: Utils.EventTarget<{'change': (item: V) => void}>;

        public constructor(){
            this._set = new Set();
            this._map = new Map();

            this._eventTarget = new Utils.EventTarget();
        }

        public hasKey(key: K): boolean{
            return this._map.has(key);
        }

        public hasValue(value: V): boolean{
            return this._set.has(value);
        }

        public get(key: K): V | undefined{
            return this._map.get(key);
        }

        public set(key: K, value: V){
            if (this._map.get(key) !== value){
                if (this._set.has(value)){
                    throw new Errors.VisualError('Вказане значення вже використовується іншим ключем.');
                }

                const oldValue = this._map.get(key);

                if (oldValue !== undefined){
                    this._set.delete(oldValue);
                    this._eventTarget.dispatchEvent('change', oldValue);
                }

                this._set.add(value);
                this._map.set(key, value);
                this._eventTarget.dispatchEvent('change', value);
            }
        }

        public delete(key: K){
            const value = this._map.get(key);

            if (value !== undefined){
                this._map.delete(key);
                this._set.delete(value);
                this._eventTarget.dispatchEvent('change', value);
            }
        }

        public clear(){
            for (const key of this._map.keys()){
                this.delete(key);
            }
        }

        public addChangeListener(listener: (value: V) => void){
            this._eventTarget.addEventListener('change', listener);
        }

        public removeChangeListener(listener: (value: V) => void){
            this._eventTarget.removeEventListener('change', listener);
        }

        *[Symbol.iterator](){
            for (const entry of this._map){
                yield entry;
            }
        }
    }
}