namespace App.ASD.Structures.Graphics{
    export class GraphGraphicsManager extends BaseGraphicsManager<IGraph>{
        private readonly _items: Items.GraphVertex[];

        public constructor(element: Graph, items: Items.GraphVertex[]){
            super({
                element: element,
                viewSize: new Utils.Vector(1000, 500),
                graphics: {}
            });

            this._items = items;
        }

        public clearHighlight(){
            for (const item of this._items){
                item.graphicsManager.clearHighlight();
            }
        }

        public setVisibleConnectionsWeights(isVisible: boolean){
            for (const item of this._items){
                item.graphicsManager.setVisibleConnectionsWeights(isVisible);
            }
        }
    }
}