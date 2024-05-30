namespace StructVisorAPI.Utils{
    export class Vector extends Geometry<Vector>{
        private _x: number;
        private _y: number;

        public constructor(x?: number, y?: number);
        public constructor(object: VectorObjectType);
        
        public constructor(...args: [(number | VectorObjectType)?, number?]){
            super();

            this._x = (typeof args[0] === 'object') ? args[0].x : args[0] ?? 0;
            this._y = (typeof args[0] === 'object') ? args[0].y : args[1] ?? 0;
        }

        public get x(): number{
            return this._x;
        }

        public set x(value: number){
            if (this._x !== value){
                this._x = value;
                this._dispatchChange();
            }
        }

        public get y(): number{
            return this._y;
        }

        public set y(value: number){
            if (this._y !== value){
                this._y = value;
                this._dispatchChange();
            }
        }

        public toObject(): VectorObjectType{
            return {x: this.x, y: this.y};
        }

        public copy(): Vector{
            return new Vector(this.x, this.y);
        }

        public compare(vector: Vector): boolean{
            return this.x === vector.x && this.y === vector.y;
        }

        public getDistanceTo(vector: Vector): number{
            return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
        }
    }
}