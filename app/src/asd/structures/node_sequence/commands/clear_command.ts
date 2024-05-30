namespace App.ASD.Structures.Commands{
    export abstract class NodeSequenceClearCommand extends NodeSequenceCommand<INodeSequenceClearCommand>{
        protected readonly _itemsCopy: Items.NodeItem[];

        protected constructor(items: Items.NodeItem[]){
            super(items);

            if (this._items.length === 0){
                throw new Errors.ASDError('Відсутні елементи для видалення.');
            }

            this._itemsCopy = [...items];
        }

        public toObject(): CommandObjectType<INodeSequenceClearCommand>{
            return {name: 'clear'};
        }

        public undo(){
            for (const item of this._itemsCopy){
                this._items.push(item);
                item.graphicsManager.setVisible(true);
            }
        }

        protected _executeAlgorithm(){
            while (this._items.length > 0){
                this._items.pop()!.graphicsManager.setVisible(false);
            }
        }

        protected* _executeAnimation(){}
    }
}