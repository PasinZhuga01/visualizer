namespace App.ASD.Structures.Commands{
    export class StackPopCommand extends NodeSequenceCommand<IStackPopCommand>{
        protected readonly _graphicsManager: Graphics.StackGraphicsManager;

        private readonly _item: Items.NodeItem;
        private readonly _previousItem: Items.NodeItem | null;

        public constructor(items: Items.NodeItem[], graphicsManager: Graphics.StackGraphicsManager){
            super(items);

            if (this._items.length === 0){
                throw new Errors.ASDError('Неможливо видалити елемент, оскільки він не був визначений.');
            }

            this._item = this._items[items.length - 1]!;
            this._previousItem = this._items[items.length - 2] ?? null;

            this._graphicsManager = graphicsManager;
        }

        public toObject(): CommandObjectType<IStackPopCommand>{
            return {name: 'pop'};
        }

        public undo(){
            this._items.push(this._item);

            this._item.graphicsManager.setVisible(true);
            this._graphicsManager.setTopItem(this._item);

            Utils.startGenerator(this._item.graphicsManager.moveTextToNode(1));
        }

        protected _executeAlgorithm(){
            this._items.pop();
        }

        protected* _executeAnimation(mode: CommandModeType){
            const stepsCount = (mode === 'start') ? 64 : 1;
            const moverTextFromNode = this._item.graphicsManager.moveTextFromNode(stepsCount);
            
            while (!moverTextFromNode.next().done){
                yield;
            }

            this._item.graphicsManager.setVisible(false);
            this._graphicsManager.setTopItem(this._previousItem);
        }
    }
}