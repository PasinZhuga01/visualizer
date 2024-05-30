namespace App.ASD.Structures.Commands{
    export class GraphConnectVerticesCommand extends BaseCommand<IGraphConnectVerticesCommand>{
        private readonly _isOriented: boolean;
        private readonly _weight: number;

        private readonly _startItem: Items.GraphVertex;
        private readonly _lastItem: Items.GraphVertex;

        private readonly _startIndex: number;
        private readonly _lastIndex: number;

        public constructor(items: Items.GraphVertex[], isOriented: boolean, weight: number, startIndex: number, lastIndex: number){
            super(items);

            if (this._items[startIndex] === undefined){
                throw new Errors.ASDError('Індекс початкової вершини було введено некоректно.');
            }
            if (this._items[lastIndex] === undefined){
                throw new Errors.ASDError('Індекс кінцевої вершини було введено некоректно.');
            }

            this._isOriented = isOriented;
            this._weight = weight;

            this._startItem = this._items[startIndex]!;
            this._lastItem = this._items[lastIndex]!;

            this._startIndex = startIndex;
            this._lastIndex = lastIndex;

            const connections = this._startItem.getConnections();

            if (connections.from.has(this._lastItem) || (!this._isOriented && connections.to.has(this._lastItem))){
                throw new Errors.ASDError('Неможливо створити з\'єднання між вершинами, оскільки воно вже існує.');
            }
        }

        public toObject(): CommandObjectType<IGraphConnectVerticesCommand>{
            return {name: 'connect-vertices', isOriented: this._isOriented, weight: this._weight, startIndex: this._startIndex, lastIndex: this._lastIndex};
        }

        public undo(){
            this._startItem.disconnect(this._lastItem);
            
            if (!this._isOriented){
                this._lastItem.disconnect(this._startItem);
            }
        }

        protected _executeAlgorithm(){
            this._startItem.connect(this._isOriented, this._weight, this._lastItem);
        }

        protected* _executeAnimation(){}
    }
}