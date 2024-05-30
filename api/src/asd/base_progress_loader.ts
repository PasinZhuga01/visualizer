namespace StructVisorAPI.ASD{
    export abstract class BaseProgressLoader<T extends IStructure>{
        private readonly _invoker: Invoker<T>;
        private readonly _commandsCallbacks: CommandsCallbacksType<T>;

        private _isAlreadyLoaded: boolean;
        private readonly _structure: T['class'];

        protected constructor(args: {structure: T['class'], invoker: Invoker<T>, commandsCallbacks: CommandsCallbacksType<T>}){
            this._isAlreadyLoaded = false;

            this._structure = args.structure;
            this._invoker = args.invoker;
            this._commandsCallbacks = args.commandsCallbacks;
        }

        public load(items: T['item']['class'][]){
            if (!this._isAlreadyLoaded){
                this._isAlreadyLoaded = true;

                const progress = Storage.getItem('progress')[this._structure.name] ?? {stack: [], cancelCount: 0};

                for (const obj of progress.stack){
                    if (!(obj.name in this._commandsCallbacks)){
                        throw new Errors.DesignError(`Завантажувач прогресу "${this.constructor.name}" не підтримує виконання команд з назвою "${obj.name}".`);
                    }

                    this._invoker.executeCommand(this._commandsCallbacks[obj.name as keyof CommandsCallbacksType<T>]!(items, obj), true);
                }

                while (progress.cancelCount > 0){
                    progress.cancelCount--;
                    this._invoker.undo();
                }
            }
        }

        public save(commands: StackCommandsType<T['commands'][number]['class']>){
            const progress = Storage.getItem('progress');
            progress[this._structure.name] = {stack: [], cancelCount: commands.cancelCount};

            for (const command of commands.stack){
                progress[this._structure.name]!.stack.push(command.toObject());
            }

            Storage.setItem('progress', progress);
        }
    }
}