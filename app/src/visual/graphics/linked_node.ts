namespace App.Visual.Graphics{
    export class LinkedNode extends BaseGraphic<ILinkedNodeOptions>{
        private _leftLinkState: LinkStateType = null;
        private _rightLinkState: LinkStateType = null;

        public constructor(bounds: Utils.Bounds, options: Partial<ILinkedNodeOptions> = {}){
            super(bounds, options);
            this._setOptions(options);
        }

        public get leftLinkState(): LinkStateType{
            return this._leftLinkState;
        }

        public set leftLinkState(linkState: LinkStateType){
            if (this._leftLinkState !== linkState){
                this._leftLinkState = linkState;
                this._update();
            }
        }

        public get rightLinkState(): LinkStateType{
            return this._rightLinkState;
        }

        public set rightLinkState(linkState: LinkStateType){
            if (this._rightLinkState !== linkState){
                this._rightLinkState = linkState;
                this._update();
            }
        }

        public getWidthPadding(): number{
            return Math.round(this.bounds.width / 100 * 28);
        }

        public getInnerWidth(): number{
            return this.bounds.width - this.getWidthPadding() * 2;
        }

        public getInnerX(): number{
            return this.bounds.x + this.getWidthPadding();
        }

        protected _setOptions(options: Partial<ILinkedNodeOptions>){
            if ('leftLinkState' in options){
                this.leftLinkState = options.leftLinkState;
            }
            if ('rightLinkState' in options){
                this.rightLinkState = options.rightLinkState;
            }
        }

        protected _render(context: CanvasRenderingContext2D){            
            this._drawRectangle(context);
            this._drawLinkRectangles(context);
        }

        private _drawRectangle(context: CanvasRenderingContext2D){
            context.fillRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
            context.strokeRect(this.bounds.x + this.strokeWidth, this.bounds.y + this.strokeWidth, this.bounds.width - this.strokeWidth * 2, this.bounds.height - this.strokeWidth * 2);
        }

        private _drawLinkRectangles(context: CanvasRenderingContext2D){
            const padding = this.getWidthPadding();

            if (this._leftLinkState !== null){
                context.beginPath();
                context.moveTo(this.bounds.x + padding, this.bounds.y);
                context.lineTo(this.bounds.x + padding, this.bounds.y + this.bounds.height);
                context.stroke();

                if (this._leftLinkState === 'closed'){
                    context.beginPath();
                    context.moveTo(this.bounds.x + this.strokeWidth, this.bounds.y + this.strokeWidth);
                    context.lineTo(this.bounds.x + padding - this.strokeWidth, this.bounds.y + this.bounds.height - this.strokeWidth);
                    context.stroke();
                }
            }
            if (this._rightLinkState !== null){
                context.beginPath();
                context.moveTo(this.bounds.x + this.bounds.width - padding, this.bounds.y);
                context.lineTo(this.bounds.x + this.bounds.width - padding, this.bounds.y + this.bounds.height);
                context.stroke();

                if (this._rightLinkState === 'closed'){
                    context.beginPath();
                    context.moveTo(this.bounds.x + this.bounds.width - padding + this.strokeWidth, this.bounds.y + this.strokeWidth);
                    context.lineTo(this.bounds.x + this.bounds.width - this.strokeWidth, this.bounds.y + this.bounds.height - this.strokeWidth);
                    context.stroke();
                }
            }
        }
    }
}