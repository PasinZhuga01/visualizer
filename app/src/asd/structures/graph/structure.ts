namespace App.ASD.Structures{
    export class Graph extends BaseStructure<IGraph>{
        protected readonly _controlsManager: Controls.GraphControlsManager;
        protected readonly _graphicsManager: Graphics.GraphGraphicsManager;
        protected readonly _progressLoader: Progress.GraphProgressLoader;

        public constructor(){
            super('graph', 'Граф');

            this._controlsManager = new Controls.GraphControlsManager(this, this._items);
            this._graphicsManager = new Graphics.GraphGraphicsManager(this, this._items);
            this._progressLoader = new Progress.GraphProgressLoader(this, this._invoker);
        }

        public checkInViewSize(position: Utils.Vector): boolean{
            return new Utils.Bounds(this._graphicsManager.viewSize as Utils.Vector).checkCollide(position);
        }

        public addVertex(title: string, center: Utils.Vector){
            this._invoker.executeCommand(new Commands.GraphAddVertexCommand(this._items, title, center));
        }

        public removeVertex(vertex: Items.GraphVertex){
            this._invoker.executeCommand(new Commands.GraphRemoveVertexCommand(this._items, this._items.indexOf(vertex)));
        }

        public clearVertices(){
            this._invoker.executeCommand(new Commands.GraphClearVerticesCommand(this._items));
        }

        public connectVertices(isOriented: boolean, weight: number, startVertex: Items.GraphVertex, lastVertex: Items.GraphVertex){
            const startIndex = this._items.indexOf(startVertex);
            const lastIndex = this._items.indexOf(lastVertex);
    
            this._invoker.executeCommand(new Commands.GraphConnectVerticesCommand(this._items, isOriented, weight, startIndex, lastIndex));
        }

        public disconnectVertices(startVertex: Items.GraphVertex, lastVertex: Items.GraphVertex){
            const startIndex = this._items.indexOf(startVertex);
            const lastIndex = this._items.indexOf(lastVertex);

            this._invoker.executeCommand(new Commands.GraphDisconnectVerticesCommand(this._items, startIndex, lastIndex));
        }

        public clearConnections(){
            this._invoker.executeCommand(new Commands.GraphClearConnectionsCommand(this._items));
        }

        public clearHighlight(){
            this._graphicsManager.clearHighlight();
        }

        public setVisibleConnectionsWeights(isVisible: boolean){
            this._graphicsManager.setVisibleConnectionsWeights(isVisible);
        }

        public findVertexIndex(title: string): number
        public findVertexIndex(position: Utils.Vector): number;
        
        public findVertexIndex(arg: string | Utils.Vector): number{
            for (let index = 0; index < this._items.length; index++){
                const item = this._items[index]!;

                if ((arg instanceof Utils.Vector && item.graphicsManager.checkCollide(arg)) || item.title === arg){
                    return index;
                }
            }

            return -1;
        }
    }
}