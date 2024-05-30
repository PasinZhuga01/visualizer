namespace App.ASD.Structures.Commands{
    export abstract class NodeSequenceCommand<T extends ICommand<INodeSequence>> extends BaseCommand<T>{
        protected abstract readonly _graphicsManager: Graphics.NodeSequenceGraphicsManager<T['structure']> | undefined;

        protected constructor(items: Items.NodeItem[]){
            super(items, (percent) => 100 - Math.sqrt(percent) * 10);
        }
    }
}