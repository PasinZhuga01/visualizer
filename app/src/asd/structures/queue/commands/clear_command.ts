namespace App.ASD.Structures.Commands{
    export class QueueClearCommand extends NodeSequenceClearCommand{
        protected readonly _graphicsManager: Graphics.QueueGraphicsManager;

        private readonly _headItem: Items.NodeItem;
        private readonly _tailItem: Items.NodeItem;
        
        public constructor(items: Items.NodeItem[], graphicsManager: Graphics.QueueGraphicsManager){
            super(items);

            this._headItem = this._items[0]!;
            this._tailItem = this._items[this._items.length - 1]!;

            this._graphicsManager = graphicsManager;
        }

        public override undo(){
            super.undo();

            this._graphicsManager.setHeadItem(this._headItem);
            this._graphicsManager.setTailItem(this._tailItem);
        }

        protected override _executeAlgorithm(){
            super._executeAlgorithm();

            this._graphicsManager.setHeadItem(null);
            this._graphicsManager.setTailItem(null);
        }
    }
}