namespace App.ASD.Structures.Progress{
    export class StackProgressLoader extends BaseProgressLoader<IStack>{
        public constructor(structure: Stack, invoker: Invoker<IStack>, graphicsManager: Graphics.StackGraphicsManager){
            super({
                structure: structure,
                invoker: invoker,
                commandsCallbacks: {
                    'push': (items, obj) => new Commands.StackPushCommand(items, graphicsManager, obj.title),
                    'pop': (items) => new Commands.StackPopCommand(items, graphicsManager),
                    'clear': (items) => new Commands.StackClearCommand(items, graphicsManager)
                }
            });
        }
    }
}