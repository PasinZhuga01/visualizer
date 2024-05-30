namespace App.ASD.Structures.Graphics{
    export class StackGraphicsManager extends NodeSequenceGraphicsManager<IStack>{
        private _topItem: Items.NodeItem | null;

        private readonly _topItemUpdateCallback: () => void;

        public constructor(element: Stack, items: Items.NodeItem[]){
            super({
                element: element,
                items: items,
                viewSize: new Utils.Vector(1000, 500),
                graphics: {
                    'top-arrow': new Visual.Graphics.Line(new Utils.Bounds(1000, 500, 0, 0), new Utils.Vector(180, 100), new Utils.Vector(), {isVisible: false, countArrows: 1}),
                    'top-text': new Visual.Graphics.Text(new Utils.Bounds(32, 32, 132, 84), 'Top', {verticalAlign: 'center'}),
                    'top-rectangle': new Visual.Graphics.LinkRectangle(new Utils.Bounds(32, 32, 164, 84), {isCrossed: true}),
                    'output-text': new Visual.Graphics.Text(new Utils.Bounds(80, 20, 16, 36))
                }
            });

            this._topItem = null;
            this._topItemUpdateCallback = () => this._updateTopItem();
        }

        private get _topArrowGraphic(): Visual.Graphics.Line{
            return this._getGraphic('top-arrow');
        }

        private get _topRectangleGraphic(): Visual.Graphics.LinkRectangle{
            return this._getGraphic('top-rectangle');
        }

        public setTopItem(item: Items.NodeItem | null){
            if (this._topItem !== item){
                const hasTopItem = (item !== null);

                if (this._topItem !== null){
                    this._topItem.graphicsManager.removeMoveListener(this._topItemUpdateCallback);
                }

                if (hasTopItem){
                    item.graphicsManager.addMoveListener(this._topItemUpdateCallback);
                }

                this._topItem = item;
                this._topArrowGraphic.isVisible = hasTopItem;
                this._topRectangleGraphic.isCrossed = !hasTopItem;

                this._updateTopItem();
            }
        }

        private _updateTopItem(){
            if (this._topItem !== null){
                const target = this._topItem.graphicsManager.getTopArrowTargetPosition();

                this._topArrowGraphic.to.x = target.x;
                this._topArrowGraphic.to.y = target.y;
            }
        }
    }
}