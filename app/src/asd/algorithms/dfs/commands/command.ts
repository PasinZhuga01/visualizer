namespace App.ASD.Algorithms.Commands{
    export class DFSCommand extends GraphTraversalCommand<IDFSCommand>{
        protected readonly _graphicsManager?: Graphics.DFSGraphicsManager;

        public constructor(items: Items.GraphVertex[], structure: Structures.Graph, startIndex: number, lastIndex: number, managers?: GraphTraversalManagersType<Graphics.DFSGraphicsManager>){
            super(items, structure, startIndex, lastIndex, managers?.controls);

            if (managers?.graphics !== undefined){
                this._graphicsManager = managers.graphics;
            }
        }

        public toObject(): CommandObjectType<IDFSCommand>{
            return {name: 'dfs', startIndex: this._startIndex, lastIndex: this._lastIndex};
        }

        protected* _executeAnimation(mode: CommandModeType){
            if (mode !== 'load'){
                const path: Map<Items.GraphVertex, Items.GraphVertex | undefined> = new Map([[this._startItem, undefined]]);
            
                let currentItem: Items.GraphVertex | undefined = this._startItem;

                this._structure.clearHighlight();
                this._graphicsManager?.setCurrentItem(null);
                this._graphicsManager?.setCurrentItem(currentItem);

                while (currentItem !== undefined && currentItem !== this._lastItem){
                    yield;

                    let isCurrentItemChanged = false;

                    for (const [item] of currentItem.getConnections().from){
                        this._graphicsManager?.setCheckedItem(currentItem, item, 'check');

                        yield;

                        this._graphicsManager?.setCheckedItem(currentItem, item, path.has(item) ? 'block' : 'next');

                        yield;

                        if (!path.has(item)){
                            path.set(item, currentItem);

                            this._graphicsManager?.setCurrentItem(item, currentItem, 'forward');

                            isCurrentItemChanged = true;
                            currentItem = item;
                            
                            break;
                        }
                    }

                    yield;

                    if (!isCurrentItemChanged){
                        const previousItem = path.get(currentItem);

                        if (previousItem !== undefined){
                            this._graphicsManager?.setCurrentItem(previousItem, currentItem, 'back');
                        }

                        currentItem = previousItem;
                    }
                }

                this._graphicsManager?.showPath(path, this._startItem, this._lastItem);
            }
        }
    }
}