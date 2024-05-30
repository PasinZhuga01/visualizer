namespace App.ASD.Algorithms.Graphics{
    export class DFSGraphicsManager extends GraphTraversalGraphicsManager{
        public constructor(element: DFS, items: Items.GraphVertex[]){
            super(element, items);
        }

        public override setCurrentItem(currentItem: Items.GraphVertex, previousItem: Items.GraphVertex, direction: 'forward' | 'back'): void;
        public override setCurrentItem(item: Items.GraphVertex | null): void;
        
        public override setCurrentItem(currentItem: Items.GraphVertex | null, previousItem?: Items.GraphVertex, direction?: 'forward' | 'back'){
            super.setCurrentItem(currentItem);

            if (currentItem !== null && previousItem !== undefined && direction !== undefined){
                const {COLORS} = GraphTraversalGraphicsManager;
                
                if (direction === 'forward'){
                    previousItem.graphicsManager.strokeColor = COLORS.ready;
                    previousItem.graphicsManager.setConnectionStrokeColor(currentItem, COLORS.ready);
                }
                else{
                    previousItem.graphicsManager.strokeColor = COLORS.block;
                    currentItem.graphicsManager.setConnectionStrokeColor(previousItem, COLORS.block);
                }

                previousItem.graphicsManager.strokeWidth = 1;
            }
        }
    }
}