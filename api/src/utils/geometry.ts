namespace StructVisorAPI.Utils{
    export abstract class Geometry<T extends Geometry<T>>{
        private _lastGeometry: T | null;
        private readonly _eventTarget: EventTarget<{'change': (lastGeometry: T) => void}>;

        protected constructor(){
            this._lastGeometry = null;
            this._eventTarget = new EventTarget();
        }

        public abstract copy(): T;

        public abstract compare(geometry: T): boolean;
        
        public addChangeListener(listener: (lastGeometry: T) => void){
            if (this._lastGeometry === null){
                this._lastGeometry = this.copy();
            }

            this._eventTarget.addEventListener('change', listener);
        }

        public removeChangeListener(listener: (lastGeometry: T) => void){
            this._eventTarget.removeEventListener('change', listener);
        }

        protected _dispatchChange(){
            if (this._lastGeometry !== null){
                this._eventTarget.dispatchEvent('change', this._lastGeometry.copy());
                this._lastGeometry = this.copy();
            }
        }
    }
}