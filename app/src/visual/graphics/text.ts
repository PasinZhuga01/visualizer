namespace App.Visual.Graphics{
    export class Text extends BaseGraphic<ITextOptions>{
        private _text: string;

        private _fontSize: number = 12;
        private _horizontalAlign: HorizontalAlignType = 'left';
        private _verticalAlign: VerticalAlignType = 'top';

        public constructor(bounds: Utils.Bounds, text: string = '', options: Partial<ITextOptions> = {}){
            super(bounds, options);
            this._text = text;
            
            this._setOptions(options);
        }

        public get text(): string{
            return this._text;
        }

        public set text(text: string){
            if (this._text !== text){
                this._text = text;
                this._update();
            }
        }

        public get fontSize(): number{
            return this._fontSize;
        }

        public set fontSize(fontSize: number){
            if (this._fontSize !== fontSize){
                this._fontSize = fontSize;
                this._update();
            }
        }

        public get horizontalAlign(): HorizontalAlignType{
            return this._horizontalAlign;
        }

        public set horizontalAlign(horizontalAlign: HorizontalAlignType){
            if (this._horizontalAlign !== horizontalAlign){
                this._horizontalAlign = horizontalAlign;
                this._update();
            }
        }

        public get verticalAlign(): VerticalAlignType{
            return this._verticalAlign;
        }

        public set verticalAlign(verticalAlign: VerticalAlignType){
            if (this._verticalAlign !== verticalAlign){
                this._verticalAlign = verticalAlign;
                this._update();
            }
        }

        protected _setOptions(options: Partial<ITextOptions>){
            if ('fontSize' in options){
                this.fontSize = options.fontSize;
            }
            if ('horizontalAlign' in options){
                this.horizontalAlign = options.horizontalAlign;
            }
            if ('verticalAlign' in options){
                this.verticalAlign = options.verticalAlign;
            }
        }

        protected _render(context: CanvasRenderingContext2D){
            context.font = `${this._fontSize}px Arial`;
            context.textBaseline = 'top';

            const measureWidth = context.measureText(this._text).width;
            const measurePosition = new Utils.Vector();

            if (this._horizontalAlign === 'left'){
                measurePosition.x = this.bounds.x;
            }
            else if (this._horizontalAlign === 'center'){
                measurePosition.x = this.bounds.x + ((this.bounds.width - measureWidth) / 2);
            }
            else if (this._horizontalAlign === 'right'){
                measurePosition.x = this.bounds.x + this.bounds.width - measureWidth;
            }

            if (this._verticalAlign === 'top'){
                measurePosition.y = this.bounds.y;
            }
            else if (this._verticalAlign === 'center'){
                measurePosition.y = this.bounds.y + ((this.bounds.height - this._fontSize) / 2);
            }
            else if (this._verticalAlign === 'bottom'){
                measurePosition.y = this.bounds.y + this.bounds.height - this._fontSize;
            }

            context.fillText(this._text, measurePosition.x, measurePosition.y);
            context.strokeText(this._text, measurePosition.x + 1, measurePosition.y + 1);
        }
    }
}