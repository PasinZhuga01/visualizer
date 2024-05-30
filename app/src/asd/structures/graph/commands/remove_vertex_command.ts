namespace App.ASD.Structures.Commands{
    export class GraphRemoveVertexCommand extends BaseCommand<IGraphRemoveVertexCommand>{
        private readonly _item: Items.GraphVertex;
        private readonly _index: number;

        private readonly _connections: Items.GraphVertexConnectionsType;

        public constructor(items: Items.GraphVertex[], index: number){
            super(items);

            if (this._items[index] === undefined){
                throw new Errors.ASDError('Індекс вершини для видалення було введено некоректно.');
            }

            this._item = this._items[index]!;
            this._index = index;

            this._connections = this._item.getConnections();
        }

        public toObject(): CommandObjectType<IGraphRemoveVertexCommand>{
            return {name: 'remove-vertex', index: this._index};
        }

        public undo(){
            this._items.splice(this._index, 0, this._item);

            this._item.connect(this._connections);
            this._item.graphicsManager.setVisible(true);
        }

        protected _executeAlgorithm(){
            this._items.splice(this._index, 1);

            this._item.disconnect(this._connections);
            this._item.graphicsManager.setVisible(false);
        }

        protected* _executeAnimation(){}
    }
}