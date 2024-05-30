namespace App.ASD.Algorithms.Commands{
    export type DijkstraCommandPathType = Map<Items.GraphVertex, {from: Items.GraphVertex, distance: number}>;

    export class DijkstraCommand extends GraphTraversalCommand<IDijkstraCommand>{
        protected readonly _graphicsManager?: Graphics.DijkstraGraphicsManager;

        public constructor(items: Items.GraphVertex[], structure: Structures.Graph, startIndex: number, lastIndex: number, managers?: GraphTraversalManagersType<Graphics.DijkstraGraphicsManager>){
            super(items, structure, startIndex, lastIndex, managers?.controls);

            if (managers?.graphics !== undefined){
                this._graphicsManager = managers.graphics;
            }
        }

        public toObject(): CommandObjectType<IDijkstraCommand>{
            return {name: 'dijkstra', startIndex: this._startIndex, lastIndex: this._lastIndex};
        }

        protected* _executeAnimation(mode: CommandModeType){
            if (mode !== 'load'){
                const ready: Set<Items.GraphVertex> = new Set();
                const path: DijkstraCommandPathType = new Map()

                let currentItem = this._startItem;

                this._structure.clearHighlight();

                this._graphicsManager?.reset();
                this._graphicsManager?.showHeaders();

                while (currentItem !== this._lastItem){
                    const fromItem = path.get(currentItem)?.from ?? null;
                    const currentItemDistance = path.get(currentItem)?.distance ?? 0;
                    
                    let nearestItem = currentItem;
                    let nearestDistance = Infinity;

                    ready.add(currentItem);

                    this._graphicsManager?.setCurrentItem(currentItem, fromItem, currentItemDistance)
                    yield;
                    
                    for (const checkedItem of this._items){
                        if (!ready.has(checkedItem)){
                            this._graphicsManager?.setCheckedItem(checkedItem);
                            yield;

                            const connection = currentItem.getConnection(checkedItem);

                            if (connection !== null){
                                const fullCheckedItemDistance = currentItemDistance + connection.weight;
                                const lastCheckedItemInfo = path.get(checkedItem);

                                if (lastCheckedItemInfo === undefined || lastCheckedItemInfo.distance > fullCheckedItemDistance){
                                    path.set(checkedItem, {from: currentItem, distance: fullCheckedItemDistance});
                                }

                                this._graphicsManager?.strokeCheckedItemConnectFrom(currentItem);
                                this._graphicsManager?.showCheckedItemDistance(fullCheckedItemDistance);
                            }
                            else{
                                this._graphicsManager?.showCheckedItemDistance(null);
                            }

                            yield;

                            const checkedItemInfo = path.get(checkedItem);

                            if (checkedItemInfo !== undefined && nearestDistance > checkedItemInfo.distance){
                                nearestItem = checkedItem;
                                nearestDistance = checkedItemInfo.distance;

                                this._graphicsManager?.setNearestItem(nearestItem);
                            }

                            this._graphicsManager?.showDistance(checkedItem, path.get(checkedItem)?.distance ?? null);
                            this._graphicsManager?.setCheckedItem(null);
                            yield;
                        }
                    }

                    this._graphicsManager?.setReadyItem(currentItem);
                    this._graphicsManager?.wrapToNextLine();

                    if (currentItem === nearestItem){
                        break;
                    }

                    currentItem = nearestItem;
                }

                this._graphicsManager?.showPath(this._startItem, this._lastItem, path);
            }
        }
    }
}