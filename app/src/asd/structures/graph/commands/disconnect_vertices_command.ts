namespace App.ASD.Structures.Commands{
    export class GraphDisconnectVerticesCommand extends BaseCommand<IGraphDisconnectVerticesCommand>{
        private readonly _isOriented: boolean;
        private readonly _weight: number;

        private readonly _startItem: Items.GraphVertex;
        private readonly _lastItem: Items.GraphVertex;

        private readonly _startIndex: number;
        private readonly _lastIndex: number;

        public constructor(items: Items.GraphVertex[], startIndex: number, lastIndex: number){
            super(items);

            if (this._items[startIndex] === undefined){
                throw new Errors.ASDError('Індекс початкової вершини було введено некоректно.')
            }
            if (this._items[lastIndex] === undefined){
                throw new Errors.ASDError('Індекс кінцевої вершини було введено некоректно.')
            }
            
            this._startItem = this._items[startIndex]!;
            this._lastItem = this._items[lastIndex]!;
            
            this._startIndex = startIndex;
            this._lastIndex = lastIndex;

            const connection = this._startItem.getConnection(this._lastItem);

            if (connection === null){
                throw new Errors.ASDError('Неможливо видалити з\'єднання між вершинами, оскільки воно не було визначено.');
            }
            
            this._isOriented = connection.isOriented;
            this._weight = connection.weight;
        }

        public toObject(): CommandObjectType<IGraphDisconnectVerticesCommand>{
            return {name: 'disconnect-vertices', startIndex: this._startIndex, lastIndex: this._lastIndex};
        }

        public undo(){
            this._startItem.connect(this._isOriented, this._weight, this._lastItem);
        }

        protected _executeAlgorithm(){
            this._startItem.disconnect(this._lastItem);
        }

        protected* _executeAnimation(){}
    }
}