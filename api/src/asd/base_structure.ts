namespace StructVisorAPI.ASD{
    export abstract class BaseStructure<T extends IStructure> extends BaseASD{
        protected readonly _invoker: Invoker<T>;
        protected readonly _items: T['item']['class'][];

        protected abstract readonly _controlsManager: BaseControlsManager<T>;
        protected abstract readonly _graphicsManager: BaseGraphicsManager<T>;
        protected abstract readonly _progressLoader: BaseProgressLoader<T>;

        private readonly _navigation: Navigation.Item;

        protected constructor(name: string, title: string){
            super(name);

            this._items = [];

            this._invoker = new Invoker();
            this._invoker.addChangeListener((commands) => this._progressLoader.save(commands));

            this._navigation = new Navigation.Item(title, () => this.select());
        }

        public get isAnimationPaused(): boolean{
            return this._invoker.isAnimationPaused;
        }
        
        public override select(){
            super.select();

            this._controlsManager.setVisible(true);
            this._graphicsManager.setVisible(true, this._items);
            this._progressLoader.load(this._items);
        }

        public override unselect(){
            super.unselect();

            this._invoker.skip();
            this._controlsManager.setVisible(false);
            this._graphicsManager.setVisible(false, this._items);
        }

        public perform(action: 'undo' | 'redo' | 'skip' | 'toggleAnimationPause'){
            this._invoker[action]();
        }

        public insert<U extends IAlgorithm<T>>(algorithm: U['class']): {invoker: Invoker<T>, items: T['item']['class'][]}{
            if (algorithm.checkDefineReferences()){
                throw new Errors.DesignError(`Алгоритм "${algorithm.name}" вже містить необхідні дані структури "${this.constructor.name}".`);
            }

            this._navigation.insertSubItem(algorithm.title, () => algorithm.select());
            return {invoker: this._invoker, items: this._items};
        }
    }
}