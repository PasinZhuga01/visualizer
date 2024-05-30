namespace App.ASD.Structures.Commands{
    export class QueueEnqueueCommand extends NodeSequenceCommand<IQueueEnqueueCommand>{
        protected readonly _graphicsManager: Graphics.QueueGraphicsManager;
        
        private readonly _index: number;

        private readonly _item: Items.NodeItem;
        private readonly _previousItem: Items.NodeItem | null;

        public constructor(items: Items.NodeItem[], graphicsManager: Graphics.QueueGraphicsManager, title: string){
            super(items);

            if (title.length === 0){
                throw new Errors.ASDError('Заголовок елементу не було вказано.');
            }

            this._index = this._items.length;

            this._item = new Items.NodeItem(title, 'right');
            this._previousItem = this._items[this._items.length - 1] ?? null;

            this._graphicsManager = graphicsManager;
        }

        public toObject(): CommandObjectType<IQueueEnqueueCommand>{
            return {name: 'enqueue', title: this._item.title};
        }

        public undo(){
            this._items.pop();

            this._item.graphicsManager.setVisible(false);

            if (this._previousItem !== null){
                this._previousItem.rightLinkedItem = null
            }
            else this._graphicsManager.setHeadItem(null);

            this._graphicsManager.setTailItem(this._previousItem);
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

            if (this._previousItem === null){
                this._graphicsManager.setHeadItem(this._item);
            }

            this._graphicsManager.setTailItem(this._item);

            while (!moverNodeToResult.next().done){
                yield;
            }

            if (this._previousItem !== null){
                this._previousItem.rightLinkedItem = this._item;
            }
        }
    }
}