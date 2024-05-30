namespace StructVisorAPI.Visualizer.Graphics{
    export abstract class BaseGraphic<T extends IBaseGraphicOptions>{
        public readonly bounds: Utils.Bounds;

        private _isVisible: boolean = true;
        private _fillColor: ColorType = null;
        private _strokeColor: ColorType = Theme.dynamicColor;
        private _strokeWidth: number = 1;

        protected constructor(bounds: Utils.Bounds, options: Partial<T>){
            this.bounds = bounds;
            this.bounds.addChangeListener((lastBounds) => this._update(lastBounds));

            this.setOptions(options);
        }

        public get isVisible(): boolean{
            return this._isVisible;
        }

        public set isVisible(isVisible: boolean){
            if (this._isVisible !== isVisible){
                this._isVisible = isVisible;
                this._update();
            }
        }

        public get fillColor(): ColorType{
            return this._fillColor;
        }

        public set fillColor(color: ColorType){
            if (this._fillColor !== color){
                this._fillColor = color;
                this._update();
            }
        }

        public get strokeColor(): ColorType{
            return this._strokeColor;
        }

        public set strokeColor(color: ColorType){
            if (this._strokeColor !== color){
                this._strokeColor = color;
                this._update();
            }
        }

        public get strokeWidth(): number{
            return this._strokeWidth;
        }

        public set strokeWidth(width: number){
            if (this._strokeWidth !== width){
                this._strokeWidth = width;
                this._update();
            }
        }

        public setOptions(options: Partial<T>){
            if ('isVisible' in options){
                this.isVisible = options.isVisible;
            }
            if ('fillColor' in options){
                this.fillColor = options.fillColor;
            }
            if ('strokeColor' in options){
                this.strokeColor = options.strokeColor;
            }
            if ('strokeWidth' in options){
                this.strokeWidth = options.strokeWidth;
            }

            this._setOptions(options);
        }

        public render(context: CanvasRenderingContext2D){
            if (this._isVisible){
                context.fillStyle = BaseGraphic.convertToColorString(this.fillColor);
                context.strokeStyle = BaseGraphic.convertToColorString(this.strokeColor);
                context.lineWidth = this._strokeWidth;

                this._render(context);
            }
        }

        protected abstract _render(context: CanvasRenderingContext2D): void;

        protected abstract _setOptions(options: Partial<T>): void;

        protected _update(lastBounds?: Utils.Bounds){
            if (checkDisplay(this)){
                if (lastBounds !== undefined){
                    render(lastBounds);
                }

                render(this.bounds);
            }
        }

        public static convertToColorString(color: ColorType): string{
            return (color === null) ? 'transparent' : (color === Theme.dynamicColor) ? Theme.getColor('--fourth-main-color') : color;
        }
    }
}