namespace App.ASD.Structures.Commands{
    export class GraphClearVerticesCommand extends BaseCommand<IGraphClearVerticesCommand>{
        private readonly _itemsCopy: Items.GraphVertex[];

        public constructor(items: Items.GraphVertex[]){
            super(items);

            if (items.length === 0){
                throw new Errors.ASDError('Відсутні елементи для видалення.');
            }

            this._itemsCopy = [...items];
        }

        public toObject(): CommandObjectType<IGraphClearVerticesCommand>{
            return {name: 'clear-vertices'};
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