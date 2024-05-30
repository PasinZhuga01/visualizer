namespace App.ASD.Algorithms{
    export abstract class GraphTraversal extends BaseAlgorithm<IGraphTraversal>{
        protected readonly _controlsManager: Controls.GraphTraversalControlsManager;

        public constructor(structure: Structures.Graph, name: string, title: string){
            super(structure, name, title);
            this._controlsManager = new Controls.GraphTraversalControlsManager(this);
        }

        public abstract start(startIndex: number, lastIndex: number): void;
    }
}