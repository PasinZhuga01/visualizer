namespace App.ASD.Algorithms{
    export class DFS extends GraphTraversal{
        protected readonly _graphicsManager: Graphics.DFSGraphicsManager;

        public constructor(structure: Structures.Graph){
            super(structure, 'dfs', 'Пошук в глибину');
            this._graphicsManager = new Graphics.DFSGraphicsManager(this, this._items);
        }

        public start(startIndex: number, lastIndex: number){
            const managers = {controls: this._controlsManager, graphics: this._graphicsManager};
            this._invoker.executeCommand(new Commands.DFSCommand(this._items, this.structure, startIndex, lastIndex, managers));
        }
    }
}