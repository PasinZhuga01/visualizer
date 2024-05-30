namespace App.ASD.Structures.Graphics{
    export class QueueGraphicsManager extends NodeSequenceGraphicsManager<IQueue>{
        private _headItem: Items.NodeItem | null;
        private _tailItem: Items.NodeItem | null;

        private readonly _headItemUpdateCallback: () => void;
        private readonly _tailItemUpdateCallback: () => void;

        public constructor(element: Queue, items: Items.NodeItem[]){
            super({
                element: element,
                items: items,
                viewSize: new Utils.Vector(1000, 500),
                graphics: {
                    'head-arrow': new Visual.Graphics.Line(new Utils.Bounds(1000, 500, 0, 0), new Utils.Vector(180, 100), new Utils.Vector(), {isVisible: false, countArrows: 1}),
                    'head-text': new Visual.Graphics.Text(new Utils.Bounds(32, 32, 124, 84), 'Head', {verticalAlign: 'center'}),
                    'head-rectangle': new Visual.Graphics.LinkRectangle(new Utils.Bounds(32, 32, 164, 84), {isCrossed: true}),

                    'tail-arrow': new Visual.Graphics.Line(new Utils.Bounds(1000, 500, 0, 0), new Utils.Vector(180, 400), new Utils.Vector(), {isVisible: false, countArrows: 1}),
                    'tail-text': new Visual.Graphics.Text(new Utils.Bounds(32, 32, 136, 384), 'Tail', {verticalAlign: 'center'}),
                    'tail-rectangle': new Visual.Graphics.LinkRectangle(new Utils.Bounds(32, 32, 164, 384), {isCrossed: true}),
                }
            });

            this._headItem = null;
            this._tailItem = null;

            this._headItemUpdateCallback = () => this._updateHeadItem();
            this._tailItemUpdateCallback = () => this._updateTailItem();
        }

        private get _headRectangleGraphic(): Visual.Graphics.LinkRectangle{
            return this._getGraphic('head-rectangle');
        }

        private get _headArrowGraphic(): Visual.Graphics.Line{
            return this._getGraphic('head-arrow');
        }

        private get _tailRectangleGraphic(): Visual.Graphics.LinkRectangle{
            return this._getGraphic('tail-rectangle');
        }

        private get _tailArrowGraphic(): Visual.Graphics.Line{
            return this._getGraphic('tail-arrow');
        }

        public setHeadItem(item: Items.NodeItem | null){
            if (this._headItem !== item){
                const hasHeadItem = (item !== null);

                if (this._headItem !== null){
                    this._headItem.graphicsManager.removeMoveListener(this._headItemUpdateCallback);
                }

                if (hasHeadItem){
                    item.graphicsManager.addMoveListener(this._headItemUpdateCallback);
                }

                this._headItem = item;
                this._headArrowGraphic.isVisible = hasHeadItem;
                this._headRectangleGraphic.isCrossed = !hasHeadItem;

                this._updateHeadItem();
            }
        }

        public setTailItem(item: Items.NodeItem | null){
            if (this._tailItem !== item){
                const hasHeadItem = (item !== null);

                if (this._tailItem !== null){
                    this._tailItem.graphicsManager.removeMoveListener(this._tailItemUpdateCallback);
                }

                if (hasHeadItem){
                    item.graphicsManager.addMoveListener(this._tailItemUpdateCallback);
                }

                this._tailItem = item;
                this._tailArrowGraphic.isVisible = hasHeadItem;
                this._tailRectangleGraphic.isCrossed = !hasHeadItem;

                this._updateTailItem();
            }
        }

        private _updateHeadItem(){
            this._updateItem(this._headItem, this._headArrowGraphic, (item) => item.graphicsManager.getTopArrowTargetPosition());
        }

        private _updateTailItem(){
            this._updateItem(this._tailItem, this._tailArrowGraphic, (item) => item.graphicsManager.getBottomArrowTargetPosition());
        }

        private _updateItem(item: Items.NodeItem | null, arrowGraphic: Visual.Graphics.Line, targetPositionCallback: (item: Items.NodeItem) => Utils.Vector){
            if (item !== null){
                const target = targetPositionCallback(item);

                arrowGraphic.to.x = target.x;
                arrowGraphic.to.y = target.y;
            }
        }
    }
}