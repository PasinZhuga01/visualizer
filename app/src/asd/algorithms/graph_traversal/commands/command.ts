namespace App.ASD.Algorithms.Commands{
    type GraphTraversalGraphicsManagerType = BaseGraphicsManager<IAlgorithm<Structures.IStructure>>;

    export type GraphTraversalManagersType<T extends GraphTraversalGraphicsManagerType> = {
        controls: Controls.GraphTraversalControlsManager;
        graphics: T;
    };
    
    export abstract class GraphTraversalCommand<T extends IGraphTraversalCommand> extends BaseCommand<T>{
        protected abstract readonly _graphicsManager?: GraphTraversalGraphicsManagerType;
        
        protected readonly _structure: Structures.Graph;

        protected readonly _startItem: Items.GraphVertex;
        protected readonly _lastItem: Items.GraphVertex;

        protected readonly _startIndex: number;
        protected readonly _lastIndex: number;

        public constructor(items: Items.GraphVertex[], structure: Structures.Graph, startIndex: number, lastIndex: number, controlsManager?: Controls.GraphTraversalControlsManager){
            super(items, (percent) => (Animations.Speed.MAX_PERCENT - percent) * 10);

            if (this._items[startIndex] === undefined){
                controlsManager?.clearStartItemTitle();
                throw new Errors.ASDError('Індекс початкової вершини було введено некоректно.');
            }
            if (this._items[lastIndex] === undefined){
                controlsManager?.clearLastItemTitle();
                throw new Errors.ASDError('Індекс кінцевої вершини було введено некоректно.');
            }

            this._structure = structure;

            this._startItem = this._items[startIndex]!;
            this._lastItem = this._items[lastIndex]!;

            this._startIndex = startIndex;
            this._lastIndex = lastIndex;
        }

        public undo(){
            this._structure.clearHighlight();
        }

        protected _executeAlgorithm(){}
    }
}