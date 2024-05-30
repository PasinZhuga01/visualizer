namespace App.ASD.Structures{
    export class Queue extends NodeSequence<IQueue>{
        protected readonly _controlsManager: Controls.QueueControlsManager;
        protected readonly _graphicsManager: Graphics.QueueGraphicsManager;
        protected readonly _progressLoader: Progress.QueueProgressLoader;

        public constructor(){
            super('queue', 'Черга');

            this._controlsManager = new Controls.QueueControlsManager(this);
            this._graphicsManager = new Graphics.QueueGraphicsManager(this, this._items);
            this._progressLoader = new Progress.QueueProgressLoader(this, this._invoker, this._graphicsManager);
        }

        public enqueue(title: string){
            this._invoker.executeCommand(new Commands.QueueEnqueueCommand(this._items, this._graphicsManager, title));
        }

        public dequeue(){
            this._invoker.executeCommand(new Commands.QueueDequeueCommand(this._items, this._graphicsManager));
        }

        public clear(){
            this._invoker.executeCommand(new Commands.QueueClearCommand(this._items, this._graphicsManager));
        }
    }
}