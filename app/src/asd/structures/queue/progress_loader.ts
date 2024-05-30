namespace App.ASD.Structures.Progress{
    export class QueueProgressLoader extends BaseProgressLoader<IQueue>{
        public constructor(structure: Queue, invoker: Invoker<IQueue>, graphicsManager: Graphics.QueueGraphicsManager){
            super({
                structure: structure,
                invoker: invoker,
                commandsCallbacks: {
                    'enqueue': (items, obj) => new Commands.QueueEnqueueCommand(items, graphicsManager, obj.title),
                    'dequeue': (items) => new Commands.QueueDequeueCommand(items, graphicsManager),
                    'clear': (items) => new Commands.QueueClearCommand(items, graphicsManager)
                }
            });
        }
    }
}