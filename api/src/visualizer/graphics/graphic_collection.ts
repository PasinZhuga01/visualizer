namespace StructVisorAPI.Visualizer.Graphics{
    export class GraphicCollection<T extends BaseGraphic<IBaseGraphicOptions>>{
        private readonly _items: Set<T>;
        private readonly _eventTarget: Utils.EventTarget<{'change': (item: T) => void}>;

        public constructor(){
            this._items = new Set();
            this._eventTarget = new Utils.EventTarget();
        }

        public has(item: T): boolean{
            return this._items.has(item);
        }

        public add(...items: T[]){
            for (const item of items){
                if (!this._items.has(item)){
                    this._items.add(item);
                    this._eventTarget.dispatchEvent('change', item);
                }
            }
        }

        public delete(...items: T[]){
            for (const item of items){
                if (this._items.has(item)){
                    this._items.delete(item);
                    this._eventTarget.dispatchEvent('change', item);
                }
            }
        }

        public clear(){
            this.delete(...this._items);
        }

        public addChangeListener(listener: (item: T) => void){
            this._eventTarget.addEventListener('change', listener);
        }

        public removeChangeListener(listener: (item: T) => void){
            this._eventTarget.removeEventListener('change', listener);
        }

        *[Symbol.iterator](){
            for (const item of this._items){
                yield item;
            }
        }
    }
}