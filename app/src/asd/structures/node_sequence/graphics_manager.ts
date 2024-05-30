namespace App.ASD.Structures.Graphics{
    export abstract class NodeSequenceGraphicsManager<T extends INodeSequence> extends BaseGraphicsManager<T>{
        protected readonly _items: Items.NodeItem[];

        protected constructor(args: GraphicsManagerArgsType<T> & {items: Items.NodeItem[]}){
            super(args);
            this._items = args.items;
        }

        public* moveNodesToResultsPositions(stepsCount: number){
            const generators = new Set<Generator>();

            for (let index = 0; index < this._items.length; index++){
                const item = this._items[index]!;

                generators.add(item.graphicsManager.moveNodeToResultPosition(index, stepsCount));
            }

            for (let stepIndex = 0; stepIndex < stepsCount; stepIndex++){
                for (const generator of generators){
                    yield generator.next();
                }
            }
        }
    }
}