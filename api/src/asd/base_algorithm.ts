namespace StructVisorAPI.ASD{
    export abstract class BaseAlgorithm<T extends IAlgorithm<IStructure>> extends BaseASD{
        public readonly title: string;
        public readonly structure: T['structure']['class'];

        protected abstract readonly _controlsManager: BaseControlsManager<T>;
        protected abstract readonly _graphicsManager: BaseGraphicsManager<T>;

        private readonly _references: ReturnType<T['structure']['class']['insert']>;

        protected constructor(structure: T['structure']['class'], name: string, title: string){
            super(name);

            this.title = title;
            this.structure = structure;
            
            this._references = this.structure.insert(this) as ReturnType<T['structure']['class']['insert']>;
        }

        protected get _items(): ReturnType<T['structure']['class']['insert']>['items']{
            return this._references.items;
        }

        protected get _invoker(): ReturnType<T['structure']['class']['insert']>['invoker']{
            return this._references.invoker;
        }

        public checkDefineReferences(): boolean{
            return this._references !== undefined;
        }

        public override select(){
            this.structure.select();
            this._controlsManager.setVisible(true);
            this._graphicsManager.setVisible(true);
            
            super.select();
        }

        public override unselect(){
            this.structure.unselect();
            this._controlsManager.setVisible(false);
            this._graphicsManager.setVisible(false);

            super.unselect();
        }
    }
}