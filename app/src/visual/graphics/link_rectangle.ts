namespace App.Visual.Graphics{
    export class LinkRectangle extends BaseGraphic<ILinkRectangleOptions>{
        private _isCrossed: boolean = false;

        public constructor(bounds: Utils.Bounds, options: Partial<ILinkRectangleOptions> = {}){
            super(bounds, options);
            this._setOptions(options);
        }

        public get isCrossed(): boolean{
            return this._isCrossed;
        }

        public set isCrossed(isCrossed: boolean){
            if (this._isCrossed !== isCrossed){
                this._isCrossed = isCrossed;
                this._update();
            }
        }

        protected _setOptions(options: Partial<ILinkRectangleOptions>){
            if ('isCrossed' in options){
                this.isCrossed = options.isCrossed;
            }
        }

        protected _render(context: CanvasRenderingContext2D){
            context.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            context.strokeRect(this.bounds.x + this.strokeWidth, this.bounds.y + this.strokeWidth, this.bounds.width - this.strokeWidth * 2, this.bounds.height - this.strokeWidth * 2);
            
            if (this._isCrossed){
                context.beginPath();
                context.moveTo(this.bounds.x + this.strokeWidth, this.bounds.y + this.strokeWidth);
                context.lineTo(this.bounds.x + this.bounds.width - this.strokeWidth * 2, this.bounds.y + this.bounds.height - this.strokeWidth * 2);
                context.stroke();
            }
        }
    }
}