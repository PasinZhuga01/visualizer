namespace App.ASD.Structures.Commands{
    export class StackClearCommand extends NodeSequenceClearCommand{
        protected readonly _graphicsManager: Graphics.StackGraphicsManager;

        private readonly _topItem: Items.NodeItem;
        
        public constructor(items: Items.NodeItem[], graphicsManager: Graphics.StackGraphicsManager){
            super(items);
            this._graphicsManager = graphicsManager;
            this._topItem = this._items[this._items.length - 1]!;
        }

        public override undo(){
            super.undo();
            this._graphicsManager.setTopItem(this._topItem);
        }

        protected override _executeAlgorithm(){
            super._executeAlgorithm();
            this._graphicsManager.setTopItem(null);
        }
    }
}