namespace StructVisorAPI.ASD{
    export abstract class BaseCommand<T extends ICommand<IStructure>>{
        protected readonly _items: T['structure']['item']['class'][];

        private readonly _delayCalculatorCallback: (percent: number) => number;

        private _status: CommandStatusType;

        protected constructor(items: T['structure']['item']['class'][], delayCalculatorCallback: (percent: number) => number = (percent) => percent){
            this._items = items;
            this._delayCalculatorCallback = delayCalculatorCallback;

            this._status = 'paused';
        }

        public get status(): CommandStatusType{
            return this._status;
        }

        public abstract toObject(): CommandObjectType<T>;

        public abstract undo(): void;

        public execute(isLoadFromStorage: boolean){
            this._status = 'executed';
            this._executeAlgorithm();

            if (!isLoadFromStorage){
                this._executeAsyncAnimationLoop().then(() => this._status = 'ended');
            }
            else{
                this._executeImmediateAnimationLoop('load');
                this._status = 'ended';
            }
        }

        public toggleAnimationPause(){
            if (this._status !== 'ended'){
                this._status = (this._status === 'executed') ? 'paused' : 'executed';
            }
        }

        public skip(){
            if (this._status !== 'ended'){
                this._status = 'ended';
                this._executeImmediateAnimationLoop('skip');
            }
        }

        protected abstract _executeAlgorithm(): void;

        protected abstract _executeAnimation(mode: CommandModeType): Generator;

        private _executeImmediateAnimationLoop(mode: Exclude<CommandModeType, 'start'>){
            const generator = this._executeAnimation(mode);
            while (!generator.next().done){}
        }

        private async _executeAsyncAnimationLoop(){
            const generator = this._executeAnimation('start');

            while (this._status !== 'ended'){
                if (this._status !== 'paused'){
                    if (generator.next().done){
                        break;
                    }

                    await Utils.asyncSleep(this._delayCalculatorCallback(Animations.Speed.getPercent()));
                }
                else await Utils.asyncSleep(25);
            }
        }
    }
}