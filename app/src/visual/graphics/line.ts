namespace App.Visual.Graphics{
    export class Line extends BaseGraphic<ILineOptions>{
        public readonly from: Utils.Vector;
        public readonly to: Utils.Vector;

        private _countArrows: CountArrowsType = 0;
        private _lengthArrows: number = 10;

        public constructor(bounds: Utils.Bounds, from: Utils.Vector, to: Utils.Vector, options: Partial<ILineOptions> = {}){
            super(bounds, options);
            
            this.from = from;
            this.from.addChangeListener(() => this._update());

            this.to = to;
            this.to.addChangeListener(() => this._update());

            this._setOptions(options);
        }

        public get countArrows(): CountArrowsType{
            return this._countArrows;
        }

        public set countArrows(countArrows: CountArrowsType){
            if (this._countArrows !== countArrows){
                this._countArrows = countArrows;
                this._update();
            }
        }

        public get lengthArrows(): number{
            return this._lengthArrows;
        }

        public set lengthArrows(lengthArrows: number){
            if (this._lengthArrows !== lengthArrows && this._lengthArrows > 0){
                this._lengthArrows = lengthArrows;
                this._update();
            }
        }

        protected _setOptions(options: Partial<ILineOptions>){
            if ('countArrows' in options){
                this.countArrows = options.countArrows;
            }
            if ('lengthArrows' in options){
                this.lengthArrows = options.lengthArrows;
            }
        }

        protected _render(context: CanvasRenderingContext2D){
            context.beginPath();
            context.moveTo(this.from.x, this.from.y);
            context.lineTo(this.to.x, this.to.y);
            context.stroke();

            if (this._countArrows > 0){
                const angle = Math.atan2(this.to.y - this.from.y, this.to.x - this.from.x);
            
                context.moveTo(this.to.x, this.to.y);
                context.lineTo(this.to.x - this._lengthArrows * Math.cos(angle - Math.PI / 7), this.to.y - this._lengthArrows * Math.sin(angle - Math.PI / 7));
                context.moveTo(this.to.x, this.to.y);
                context.lineTo(this.to.x - this._lengthArrows * Math.cos(angle + Math.PI / 7), this.to.y - this._lengthArrows * Math.sin(angle + Math.PI / 7));

                if (this._countArrows > 1){
                    context.moveTo(this.from.x, this.from.y);
                    context.lineTo(this.from.x + this._lengthArrows * Math.cos(angle - Math.PI / 7), this.from.y + this._lengthArrows * Math.sin(angle - Math.PI / 7));
                    context.moveTo(this.from.x, this.from.y);
                    context.lineTo(this.from.x + this._lengthArrows * Math.cos(angle + Math.PI / 7), this.from.y + this._lengthArrows * Math.sin(angle + Math.PI / 7));
                }

                context.stroke();
            }
        }
    }
}