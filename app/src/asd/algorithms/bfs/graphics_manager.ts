namespace App.ASD.Algorithms.Graphics{
    export class BFSGraphicsManager extends GraphTraversalGraphicsManager{
        public constructor(element: BFS, items: Items.GraphVertex[]){
            super(element, items);
        }

        public override setCurrentItem(currentItem: Items.GraphVertex, previousItem?: Items.GraphVertex): void;
        public override setCurrentItem(item: Items.GraphVertex | null): void;
        
        public override setCurrentItem(currentItem: Items.GraphVertex | null, previousItem?: Items.GraphVertex){
            super.setCurrentItem(currentItem);

            if (currentItem !== null && previousItem !== undefined){
                const {COLORS} = GraphTraversalGraphicsManager;

                previousItem.graphicsManager.strokeWidth = 1;
                previousItem.graphicsManager.strokeColor = COLORS.ready;
                previousItem.graphicsManager.setConnectionStrokeColor(currentItem, COLORS.ready);
            }
        }

        public setReadyItem(item: Items.GraphVertex){
            const {COLORS} = GraphTraversalGraphicsManager;
            
            item.graphicsManager.strokeWidth = 1;
            item.graphicsManager.strokeColor = COLORS.ready;
        }
    }
}