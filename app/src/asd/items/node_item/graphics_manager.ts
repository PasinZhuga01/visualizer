namespace App.ASD.Items.Graphics{
    export class NodeItemGraphicsManager extends BaseGraphicsManager<INodeItem>{
        private static readonly _START_RESULT_POSITION: Readonly<Utils.Vector> = new Utils.Vector(56, 172);
        private static readonly _ITEMS_MARGIN_X: number = 20;

        private static readonly _REMOVE_TEXT_RESULT_Y: number = 36;

        private readonly _eventTarget: Utils.EventTarget<{move: () => void}>

        public constructor(element: NodeItem){
            super({
                element: element,
                graphics: {
                    'node': new Visual.Graphics.LinkedNode(new Utils.Bounds(72, 32, 224, 26)),
                    'text': new Visual.Graphics.Text(new Utils.Bounds(40, 32, 64, 26), element.title, {strokeWidth: 0.8, horizontalAlign: 'center', verticalAlign: 'center'}),
                    'left-link': new Visual.Graphics.Line(new Utils.Bounds(), new Utils.Vector(), new Utils.Vector(), {countArrows: 1}),
                    'right-link': new Visual.Graphics.Line(new Utils.Bounds(), new Utils.Vector(), new Utils.Vector(), {countArrows: 1})
                }
            });

            this._eventTarget = new Utils.EventTarget();

            this._initializeTextGraphic();
            this._initializeNodeGraphic();
        }

        private get _nodeGraphic(): Visual.Graphics.LinkedNode{
            return this._getGraphic('node');
        }

        private get _textGraphic(): Visual.Graphics.Text{
            return this._getGraphic('text');
        }

        private get _leftLinkGraphic(): Visual.Graphics.Line{
            return this._getGraphic('left-link');
        }

        private get _rightLinkGraphic(): Visual.Graphics.Line{
            return this._getGraphic('right-link');
        }

        public addMoveListener(listener: () => void){
            this._eventTarget.addEventListener('move', listener);
        }

        public removeMoveListener(listener: () => void){
            this._eventTarget.removeEventListener('move', listener);
        }

        public getTopArrowTargetPosition(): Utils.Vector{
            return new Utils.Vector(this._nodeGraphic.bounds.x + this._nodeGraphic.bounds.width / 2, this._nodeGraphic.bounds.y);
        }

        public getBottomArrowTargetPosition(): Utils.Vector{
            return new Utils.Vector(this._nodeGraphic.bounds.x + this._nodeGraphic.bounds.width / 2, this._nodeGraphic.bounds.y + this._nodeGraphic.bounds.height);
        }

        public* moveTextToNode(stepsCount: number){
            const difference = new Utils.Vector(
                (this._nodeGraphic.getInnerX() - this._textGraphic.bounds.x) / stepsCount,
                (this._nodeGraphic.bounds.y - this._textGraphic.bounds.y) / stepsCount
            );

            for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++){
                this._textGraphic.bounds.x += difference.x;
                this._textGraphic.bounds.y += difference.y;

                yield;
            }
        }

        public* moveTextFromNode(stepsCount: number){
            const {_REMOVE_TEXT_RESULT_Y} = NodeItemGraphicsManager;
            const differenceY = (_REMOVE_TEXT_RESULT_Y - this._textGraphic.bounds.y) / stepsCount;

            for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++){
                this._textGraphic.bounds.y += differenceY;

                yield;
            }
        }

        public* moveNodeToResultPosition(index: number, stepsCount: number){
            const {_START_RESULT_POSITION, _ITEMS_MARGIN_X} = NodeItemGraphicsManager;

            const difference = new Utils.Vector(
                ((_START_RESULT_POSITION.x + (this._nodeGraphic.bounds.width + _ITEMS_MARGIN_X) * index) - this._nodeGraphic.bounds.x) / stepsCount,
                (_START_RESULT_POSITION.y - this._nodeGraphic.bounds.y) / stepsCount
            );

            for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++){
                this._nodeGraphic.bounds.x += difference.x;
                this._nodeGraphic.bounds.y += difference.y;

                this._textGraphic.bounds.x += difference.x;
                this._textGraphic.bounds.y += difference.y;

                yield;
            }
        }

        public updateLeftLink(){
            if (this._element.checkCanLinked('left')){
                const linkedItemGraphicsManager = this._element.leftLinkedItem?.graphicsManager;
                const hasLinkedItem = (linkedItemGraphicsManager !== undefined);

                if (hasLinkedItem){
                    this._leftLinkGraphic.from.x = this._nodeGraphic.bounds.x + this._nodeGraphic.getWidthPadding() / 2;
                    this._leftLinkGraphic.from.y = this._nodeGraphic.bounds.y + this._nodeGraphic.bounds.height / 2;

                    this._leftLinkGraphic.to.x = linkedItemGraphicsManager._nodeGraphic.bounds.x + linkedItemGraphicsManager._nodeGraphic.bounds.width;
                    this._leftLinkGraphic.to.y = linkedItemGraphicsManager._nodeGraphic.bounds.y + linkedItemGraphicsManager._nodeGraphic.bounds.height / 2;

                    this._leftLinkGraphic.bounds.x = this._leftLinkGraphic.to.x;
                    this._leftLinkGraphic.bounds.y = this._nodeGraphic.bounds.y;

                    this._leftLinkGraphic.bounds.width = this._leftLinkGraphic.from.x - this._leftLinkGraphic.to.x;
                    this._leftLinkGraphic.bounds.height = this._nodeGraphic.bounds.height;
                }

                this._leftLinkGraphic.isVisible = hasLinkedItem;
                this._nodeGraphic.leftLinkState = hasLinkedItem ? 'opened' : 'closed';
            }
        }

        public updateRightLink(){
            if (this._element.checkCanLinked('right')){
                const linkedItemGraphicsManager = this._element.rightLinkedItem?.graphicsManager;
                const hasLinkedItem = (linkedItemGraphicsManager !== undefined);

                if (hasLinkedItem){
                    this._rightLinkGraphic.from.x = this._nodeGraphic.bounds.x + this._nodeGraphic.bounds.width - this._nodeGraphic.getWidthPadding() / 2;
                    this._rightLinkGraphic.from.y = this._nodeGraphic.bounds.y + this._nodeGraphic.bounds.height / 2;

                    this._rightLinkGraphic.to.x = linkedItemGraphicsManager._nodeGraphic.bounds.x;
                    this._rightLinkGraphic.to.y = linkedItemGraphicsManager._nodeGraphic.bounds.y + linkedItemGraphicsManager._nodeGraphic.bounds.height / 2;

                    this._rightLinkGraphic.bounds.x = this._rightLinkGraphic.from.x;
                    this._rightLinkGraphic.bounds.y = this._nodeGraphic.bounds.y;

                    this._rightLinkGraphic.bounds.width = this._rightLinkGraphic.to.x - this._rightLinkGraphic.from.x;
                    this._rightLinkGraphic.bounds.height = this._nodeGraphic.bounds.height;
                }

                this._rightLinkGraphic.isVisible = hasLinkedItem;
                this._nodeGraphic.rightLinkState = hasLinkedItem ? 'opened' : 'closed';
            }
        }

        private _initializeTextGraphic(){
            this._textGraphic.bounds.width = this._nodeGraphic.getInnerWidth();

            if (this._element.linkDirection === 'right'){
                this._textGraphic.horizontalAlign = 'left';
            }
            else if (this._element.linkDirection === 'left'){
                this._textGraphic.horizontalAlign = 'right';
            }
            else this._textGraphic.horizontalAlign = 'center';
        }

        private _initializeNodeGraphic(){
            if (this._element.checkCanLinked('left')){
                this._nodeGraphic.leftLinkState = 'closed';
            }
            if (this._element.checkCanLinked('right')){
                this._nodeGraphic.rightLinkState = 'closed';
            }

            this._nodeGraphic.bounds.addChangeListener(() => {
                this.updateLeftLink();
                this.updateRightLink();

                this._eventTarget.dispatchEvent('move');
            });
        }
    }
}