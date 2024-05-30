namespace App.Visual.Graphics{
    export class Ellipse extends BaseGraphic<IEllipseOptions>{
        private _startAngle: number = 0;
        private _endAngle: number = 360;

        public constructor(bounds: Utils.Bounds, options: Partial<IEllipseOptions> = {}){
            super(bounds, options);
            this._setOptions(options);
        }

        public get startAngle(): number{
            return this._startAngle;
        }

        public set startAngle(angle: number){
            if (this._startAngle !== angle){
                this._startAngle = angle;
                this._update();
            }
        }

        public get endAngle(): number{
            return this._endAngle;
        }

        public set endAngle(angle: number){
            if (this._endAngle !== angle){
                this._endAngle = angle;
                this._update();
            }
        }

        protected _setOptions(options: Partial<IEllipseOptions>){
            if ('startAngle' in options){
                this.startAngle = options.startAngle;
            }
            if ('endAngle' in options){
                this.endAngle = options.endAngle;
            }
        }

        protected _render(context: CanvasRenderingContext2D){
            const radius = new Utils.Vector(this.bounds.width / 2, this.bounds.height / 2);

            context.beginPath();
            context.ellipse(this.bounds.x + radius.x, this.bounds.y + radius.y, radius.x - this.strokeWidth / 2, radius.y - this.strokeWidth / 2, 0, Utils.toRadians(this._startAngle), Utils.toRadians(this._endAngle));
            
            context.fill();
            context.stroke();
        }
    }
}