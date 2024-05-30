namespace App.ASD.Structures{
    export class Stack extends NodeSequence<IStack>{
        protected readonly _controlsManager: Controls.StackControlsManager;
        protected readonly _graphicsManager: Graphics.StackGraphicsManager;
        protected readonly _progressLoader: Progress.StackProgressLoader;

        public constructor(){
            super('stack', 'Стек');

            this._controlsManager = new Controls.StackControlsManager(this);
            this._graphicsManager = new Graphics.StackGraphicsManager(this, this._items);
            this._progressLoader = new Progress.StackProgressLoader(this, this._invoker, this._graphicsManager);
        }

        public push(title: string){
            this._invoker.executeCommand(new Commands.StackPushCommand(this._items, this._graphicsManager, title));
        }

        public pop(){
            this._invoker.executeCommand(new Commands.StackPopCommand(this._items, this._graphicsManager));
        }

        public clear(){
            this._invoker.executeCommand(new Commands.StackClearCommand(this._items, this._graphicsManager));
        }
    }
}