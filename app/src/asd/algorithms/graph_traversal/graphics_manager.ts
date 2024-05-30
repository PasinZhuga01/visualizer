namespace App.ASD.Algorithms.Graphics{
    export abstract class GraphTraversalGraphicsManager extends BaseGraphicsManager<IGraphTraversal>{
        public static readonly COLORS = {
            current: 'blue',
            next: 'aqua',
            check: 'orange',
            ready: 'limegreen',
            block: 'red',
            finalPath: 'purple',
            notFinalPath: 'gray'
        };

        protected readonly _items: Items.GraphVertex[];

        protected _currentItem: Items.GraphVertex | null;

        protected constructor(element: GraphTraversal, items: Items.GraphVertex[]){
            super({element: element, graphics: {}});
            
            this._items = items;
            this._currentItem = null;
        }

        public setCurrentItem(item: Items.GraphVertex | null){
            const {COLORS} = GraphTraversalGraphicsManager;

            if (this._currentItem !== item){
                if (this._currentItem !== null){
                    this._currentItem.graphicsManager.clearHighlight('vertex');
                }

                if (item !== null){
                    item.graphicsManager.strokeColor = COLORS.current;
                    item.graphicsManager.strokeWidth = 2;
                    item.graphicsManager.moveToFront();
                }

                this._currentItem = item;
            }
        }

        public setCheckedItem(currentItem: Items.GraphVertex, checkedItem: Items.GraphVertex, state: 'check' | 'next' | 'block'){
            currentItem.graphicsManager.setConnectionStrokeColor(checkedItem, GraphTraversalGraphicsManager.COLORS[state]);
        }

        public showPath(path: Map<Items.GraphVertex, Items.GraphVertex | undefined>, startItem: Items.GraphVertex, lastItem: Items.GraphVertex){
            const {COLORS} = GraphTraversalGraphicsManager;

            let current = lastItem;
            let previous = path.get(current)!;

            this._strokeVerticesAsNotFinalPath();

            if (current === startItem){
                current.graphicsManager.strokeWidth = 2;
                current.graphicsManager.strokeColor = COLORS.finalPath;
            }

            if (previous !== undefined){
                while (current !== startItem){
                    current.graphicsManager.strokeWidth = 2;
                    current.graphicsManager.strokeColor = COLORS.finalPath;
                    
                    previous.graphicsManager.strokeWidth = 2;
                    previous.graphicsManager.strokeColor = COLORS.finalPath;
                    previous.graphicsManager.setConnectionStrokeWidth(current, 2);
                    previous.graphicsManager.setConnectionStrokeColor(current, COLORS.finalPath);

                    current = previous;
                    previous = path.get(previous)!;
                }
            }
        }

        private _strokeVerticesAsNotFinalPath(){
            const {COLORS} = GraphTraversalGraphicsManager;

            for (const startItem of this._items){
                startItem.graphicsManager.strokeWidth = 1;
                startItem.graphicsManager.strokeColor = COLORS.notFinalPath;

                for (const [lastItem] of startItem.getConnections().from){
                    startItem.graphicsManager.setConnectionStrokeWidth(lastItem, 1);
                    startItem.graphicsManager.setConnectionStrokeColor(lastItem, COLORS.notFinalPath);
                }
            }
        }
    }
}