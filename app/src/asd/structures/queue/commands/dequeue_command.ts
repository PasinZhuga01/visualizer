namespace App.ASD.Structures.Commands{
    export class QueueDequeueCommand extends NodeSequenceCommand<IQueueDequeuePopCommand>{
        protected readonly _graphicsManager: Graphics.QueueGraphicsManager;

        private readonly _item: Items.NodeItem;
        private readonly _nextItem: Items.NodeItem | null;

        public constructor(items: Items.NodeItem[], graphicsManager: Graphics.QueueGraphicsManager){
            super(items);

            if (this._items.length === 0){
                throw new Errors.ASDError('Неможливо видалити елемент, оскільки він не був визначений.');
            }

            this._item = this._items[0]!;
            this._nextItem = this._items[1] ?? null;

            this._graphicsManager = graphicsManager;
        }

        public toObject(): CommandObjectType<IQueueDequeuePopCommand>{
            return {name: 'dequeue'};
        }

        public undo(){
            this._items.unshift(this._item);

            this._item.graphicsManager.setVisible(true);
            Utils.startGenerator(this._item.graphicsManager.moveTextToNode(1));

            this._graphicsManager.setHeadItem(this._item);

            if (this._nextItem === null){
                this._graphicsManager.setTailItem(this._item);
            }

            Utils.startGenerator(this._graphicsManager.moveNodesToResultsPositions(1));
        }

        protected _executeAlgorithm(){
            this._items.shift();
        }

        protected* _executeAnimation(mode: CommandModeType){
            const stepsCount = (mode === 'start') ? 64 : 1;
            const moverTextFromNode = this._item.graphicsManager.moveTextFromNode(stepsCount);
            const moverNodesToResult = this._graphicsManager.moveNodesToResultsPositions(stepsCount);
            
            while (!moverTextFromNode.next().done){
                yield;
            }

            this._item.graphicsManager.setVisible(false);

            this._graphicsManager.setHeadItem(this._nextItem);

            if (this._nextItem === null){
                this._graphicsManager.setTailItem(null);
            }

            while (!moverNodesToResult.next().done){
                yield;
            }
        }
    }
}