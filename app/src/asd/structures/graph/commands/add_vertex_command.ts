namespace App.ASD.Structures.Commands{
    export class GraphAddVertexCommand extends BaseCommand<IGraphAddVertexCommand>{
        private readonly _item: Items.GraphVertex;

        public constructor(items: Items.GraphVertex[], title: string, center: Utils.Vector){
            super(items);

            if (title.length === 0){
                throw new Errors.ASDError('Заголовок елементу не було вказано.');
            }

            this._item = new Items.GraphVertex(title, center);
        }

        public toObject(): CommandObjectType<IGraphAddVertexCommand>{
            return {name: 'add-vertex', title: this._item.title, center: this._item.center.toObject()};
        }

        public undo(){
            this._items.pop();
            this._item.graphicsManager.setVisible(false);
        }

        protected _executeAlgorithm(){
            this._items.push(this._item);
            this._item.graphicsManager.setVisible(true);
        }

        protected* _executeAnimation(){}
    }
}