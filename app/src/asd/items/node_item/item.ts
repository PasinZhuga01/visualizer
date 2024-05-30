namespace App.ASD.Items{
    type NodeItemLinkDirectionType = 'right' | 'left' | 'any' | null;

    export class NodeItem extends BaseItem<INodeItem>{
        public readonly graphicsManager: Graphics.NodeItemGraphicsManager;
        public readonly linkDirection: NodeItemLinkDirectionType;
        public readonly title: string;

        private _leftLinkedItem: NodeItem | null;
        private _rightLinkedItem: NodeItem | null;

        private readonly _leftLinkedItemUpdateCallback: () => void;
        private readonly _rightLinkedItemUpdateCallback: () => void;

        public constructor(title: string, linkDirection: NodeItemLinkDirectionType){
            super();
            
            this.title = title;
            this.linkDirection = linkDirection;
            this.graphicsManager = new Graphics.NodeItemGraphicsManager(this);

            this._leftLinkedItem = null;
            this._rightLinkedItem = null;
            
            this._leftLinkedItemUpdateCallback = () => this.graphicsManager.updateLeftLink();
            this._rightLinkedItemUpdateCallback = () => this.graphicsManager.updateRightLink();
        }

        public get leftLinkedItem(): NodeItem | null{
            return this._leftLinkedItem;
        }

        public set leftLinkedItem(item: NodeItem | null){
            if (this.checkCanLinked('left') && this._leftLinkedItem !== item){
                if (this._leftLinkedItem !== null){
                    this._leftLinkedItem.graphicsManager.removeMoveListener(this._leftLinkedItemUpdateCallback);
                }

                if (item !== null){
                    item.graphicsManager.addMoveListener(this._leftLinkedItemUpdateCallback);
                }

                this._leftLinkedItem = item;
                this.graphicsManager.updateLeftLink();
            }
        }

        public get rightLinkedItem(): NodeItem | null{
            return this._rightLinkedItem;
        }

        public set rightLinkedItem(item: NodeItem | null){
            if (this.checkCanLinked('right') && this._rightLinkedItem !== item){
                if (this._rightLinkedItem !== null){
                    this._rightLinkedItem.graphicsManager.removeMoveListener(this._rightLinkedItemUpdateCallback);
                }

                if (item !== null){
                    item.graphicsManager.addMoveListener(this._rightLinkedItemUpdateCallback);
                }

                this._rightLinkedItem = item;
                this.graphicsManager.updateRightLink();
            }
        }

        public checkCanLinked(direction: 'left' | 'right'): boolean{
            return this.linkDirection === 'any' || this.linkDirection === direction;
        }
    }
}