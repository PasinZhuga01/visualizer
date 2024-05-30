namespace App.ASD.Structures.Commands{
    export class GraphClearConnectionsCommand extends BaseCommand<IGraphClearConnectionsCommand>{
        private readonly _connections: Map<Items.GraphVertex, Items.GraphVertexConnectionsType>;

        public constructor(items: Items.GraphVertex[]){
            super(items);

            let isExistConnections = false;

            this._connections = new Map();

            for (const item of this._items){
                const connections = item.getConnections();
                this._connections.set(item, connections);

                if (connections.from.size > 0){
                    isExistConnections = true;
                }
            }

            if (!isExistConnections){
                throw new Errors.ASDError('Відсутні з\'єднання для видалення.');
            }
        }

        public toObject(): CommandObjectType<IGraphClearConnectionsCommand>{
            return {name: 'clear-connections'};
        }

        public undo(){
            for (const [item, connections] of this._connections){
                item.connect(connections);
            }
        }

        protected _executeAlgorithm(){
            for (const [item, connections] of this._connections){
                item.disconnect(connections);
            }
        }

        protected* _executeAnimation(){}
    }
}