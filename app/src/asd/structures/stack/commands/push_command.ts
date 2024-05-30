namespace App.ASD.Structures.Commands{
    export class StackPushCommand extends NodeSequenceCommand<IStackPushCommand>{
        protected readonly _graphicsManager: Graphics.StackGraphicsManager;
        
        private readonly _index: number;

        private readonly _item: Items.NodeItem;
        private readonly _previousItem: Items.NodeItem | null;

        public constructor(items: Items.NodeItem[], graphicsManager: Graphics.StackGraphicsManager, title: string){
            super(items);

            if (title.length === 0){
                throw new Errors.ASDError('Заголовок елементу не було вказано.');
            }

            this._index = this._items.length;

            this._item = new Items.NodeItem(title, 'left');
            this._previousItem = this._items[this._items.length - 1] ?? null;

            this._graphicsManager = graphicsManager;
        }

        public toObject(): CommandObjectType<IStackPushCommand>{
            return {name: 'push', title: this._item.title};
        }

        public undo(){
            this._items.pop();
            this._item.graphicsManager.setVisible(false);

            this._graphicsManager.setTopItem(this._previousItem);
        }

        protected _executeAlgorithm(){
            this._items.push(this._item);
            this._item.graphicsManager.setVisible(true);
        }

        protected* _executeAnimation(mode: CommandModeType){
            const stepsCount = (mode === 'start') ? 64 : 1;
            const moverTextToNode = this._item.graphicsManager.moveTextToNode(stepsCount);
            const moverNodeToResult = this._item.graphicsManager.moveNodeToResultPosition(this._index, Math.ceil(stepsCount / 2));
            
            while (!moverTextToNode.next().done){
                yield;
            }

            this._graphicsManager.setTopItem(this._item);

            while (!moverNodeToResult.next().done){
                yield;
            }

            this._item.leftLinkedItem = this._previousItem;
        }
    }
}