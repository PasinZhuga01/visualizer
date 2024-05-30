namespace App.ASD.Algorithms{
    export class BFS extends GraphTraversal{
        protected readonly _graphicsManager: Graphics.BFSGraphicsManager;

        public constructor(structure: Structures.Graph){
            super(structure, 'bfs', 'Пошук в ширину');
            this._graphicsManager = new Graphics.BFSGraphicsManager(this, this._items);
        }

        public start(startIndex: number, lastIndex: number){
            const managers = {controls: this._controlsManager, graphics: this._graphicsManager};
            this._invoker.executeCommand(new Commands.BFSCommand(this._items, this.structure, startIndex, lastIndex, managers));
        }
    }
}