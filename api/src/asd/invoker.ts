namespace StructVisorAPI.ASD{
    export class Invoker<T extends IStructure>{
        private static _lastExecutedCommand: ICommand<IStructure>['class'] | null = null;

        private readonly _commands: StackCommandsType<T['commands'][number]['class']>;
        private readonly _eventTarget: Utils.EventTarget<{'change': (commands: StackCommandsType<T['commands'][number]['class']>) => void}>

        public constructor(){
            this._commands = {stack: [], cancelCount: 0};
            this._eventTarget = new Utils.EventTarget();
        }

        public get isAnimationPaused(): boolean{
            return (this._currentCommand?.status === 'paused') ?? false;
        }

        private get _currentCommand(): T['commands'][number]['class'] | undefined{
            return this._commands.stack[this._commands.stack.length - this._commands.cancelCount - 1];
        }

        private get _nextCommand(): T['commands'][number]['class'] | undefined{
            return this._commands.stack[this._commands.stack.length - this._commands.cancelCount];
        }

        public addChangeListener(listener: (commands: StackCommandsType<T['commands'][number]['class']>) => void){
            this._eventTarget.addEventListener('change', listener);
        }

        public removeChangeListener(listener: (commands: StackCommandsType<T['commands'][number]['class']>) => void){
            this._eventTarget.removeEventListener('change', listener);
        }

        public undo(){
            if (this._currentCommand !== undefined && this._currentCommand.status === 'ended'){
                this._currentCommand.undo();
                this._commands.cancelCount++;
                this._eventTarget.dispatchEvent('change', {...this._commands});
            }
        }

        public redo(){
            if (this._nextCommand !== undefined){
                this._nextCommand.execute(true);
                this._commands.cancelCount--;
                this._eventTarget.dispatchEvent('change', {...this._commands});
            }
        }

        public toggleAnimationPause(){
            this._currentCommand?.toggleAnimationPause();
        }

        public skip(){
            this._currentCommand?.skip();
        }

        public executeCommand(command: T['commands'][number]['class'], isLoadFromStorage: boolean = false){
            if (Invoker._lastExecutedCommand === null || Invoker._lastExecutedCommand.status === 'ended'){
                Invoker._lastExecutedCommand = command;

                command.execute(isLoadFromStorage);

                this._commands.stack.splice(this._commands.stack.length - this._commands.cancelCount, this._commands.stack.length, command);
                this._commands.cancelCount = 0;

                this._eventTarget.dispatchEvent('change', {...this._commands});
            }
        }
    }
}