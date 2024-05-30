namespace App.ASD.Algorithms.Commands{
    export class BFSCommand extends GraphTraversalCommand<IBFSCommand>{
        protected readonly _graphicsManager?: Graphics.BFSGraphicsManager;

        public constructor(items: Items.GraphVertex[], structure: Structures.Graph, startIndex: number, lastIndex: number, managers?: GraphTraversalManagersType<Graphics.BFSGraphicsManager>){
            super(items, structure, startIndex, lastIndex, managers?.controls);

            if (managers?.graphics !== undefined){
                this._graphicsManager = managers.graphics;
            }
        }

        public toObject(): CommandObjectType<IBFSCommand>{
            return {name: 'bfs', startIndex: this._startIndex, lastIndex: this._lastIndex};
        }

        protected* _executeAnimation(mode: CommandModeType){
            if (mode !== 'load'){
                const path: Map<Items.GraphVertex, Items.GraphVertex | undefined> = new Map([[this._startItem, undefined]]);
                const stack: Items.GraphVertex[] = [];

                let currentItem: Items.GraphVertex | undefined = this._startItem;
                let previousItem: Items.GraphVertex | undefined = undefined;

                this._structure.clearHighlight();

                while (currentItem !== undefined && currentItem !== this._lastItem){
                    this._graphicsManager?.setCurrentItem(currentItem, path.get(currentItem));

                    if (previousItem !== undefined){
                        this._graphicsManager?.setReadyItem(previousItem);
                    }

                    yield;

                    for (const [item] of currentItem.getConnections().from){
                        this._graphicsManager?.setCheckedItem(currentItem, item, 'check');

                        yield;

                        this._graphicsManager?.setCheckedItem(currentItem, item, path.has(item) ? 'block' : 'next');

                        yield;

                        if (!path.has(item)){
                            path.set(item, currentItem);
                            stack.push(item);
                        }
                    }

                    previousItem = currentItem;
                    currentItem = stack.shift();
                }

                this._graphicsManager?.showPath(path, this._startItem, this._lastItem);
            }
        }
    }
}