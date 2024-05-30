namespace StructVisorAPI.Utils{
    export class Bounds extends Geometry<Bounds>{
        private readonly _size: Vector;
        private readonly _position: Vector;

        public constructor(width?: number, height?: number, x?: number, y?: number);
        public constructor(size: Vector, position?: Vector);
        public constructor(object: BoundsObjectType);

        public constructor(...args: [(number | Vector | BoundsObjectType)?, (number | Vector)?, number?, number?]){
            super();

            if (typeof args[0] === 'number' && (typeof args[1] === 'number' || args[1] === undefined)){
                this._size = new Vector(args[0], args[1] ?? 0);
                this._position = new Vector(args[2] ?? 0, args[3] ?? 0);
            }
            else if (args[0] instanceof Vector){
                this._size = args[0].copy();
                this._position = (args[1] instanceof Vector) ? args[1].copy() : new Vector();
            }
            else if (typeof args[0] === 'object'){
                this._size = new Vector(args[0].width, args[0].height);
                this._position = new Vector(args[0].x, args[0].y);
            }
            else{
                this._size = new Vector();
                this._position = new Vector();
            }

            this._size.addChangeListener(() => this._dispatchChange());
            this._position.addChangeListener(() => this._dispatchChange());
        }

        public get width(): number{
            return this._size.x;
        }

        public set width(value: number){
            this._size.x = value;
        }

        public get height(): number{
            return this._size.y;
        }

        public set height(value: number){
            this._size.y = value;
        }

        public get x(): number{
            return this._position.x;
        }

        public set x(value: number){
            this._position.x = value;
        }

        public get y(): number{
            return this._position.y;
        }

        public set y(value: number){
            this._position.y = value;
        }

        public toObject(): BoundsObjectType{
            return {width: this.width, height: this.height, x: this.x, y: this.y};
        }

        public copy(): Bounds{
            return new Bounds(this._size, this._position);
        }

        public compare(bounds: Bounds): boolean{
            return this.width === bounds.width && this.height === bounds.height && this.x === bounds.x && this.y === bounds.y;
        }

        public sizeCopy(): Vector{
            return this._size.copy();
        }

        public positionCopy(): Vector{
            return this._position.copy();
        }

        public checkCollide(target: Vector | Bounds): boolean{
            if (target instanceof Vector){
                return checkCollide(this.x, this.width, target.x, 1) && checkCollide(this.y, this.height, target.y, 1);
            }

            return checkCollide(this.x, this.width, target.x, target.width) && checkCollide(this.y, this.height, target.y, target.height);
        }
    }
}