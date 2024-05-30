namespace App.ASD.Algorithms{
    export class Dijkstra extends GraphTraversal{
        protected readonly _graphicsManager: Graphics.DijkstraGraphicsManager;

        public constructor(structure: Structures.Graph){
            super(structure, 'dijkstra', 'Найкоротший шлях Дейкстри');
            this._graphicsManager = new Graphics.DijkstraGraphicsManager(this, this._items);
        }

        public start(startIndex: number, lastIndex: number){
            const managers = {controls: this._controlsManager, graphics: this._graphicsManager};
            this._invoker.executeCommand(new Commands.DijkstraCommand(this._items, this.structure, startIndex, lastIndex, managers));
        }
    }
}