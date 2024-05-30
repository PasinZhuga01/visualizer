namespace StructVisorAPI.ASD{
    export abstract class BaseGraphicsManager<T extends IStructure | IAlgorithm<IStructure> | IItem>{
        protected readonly _element: T['class'];

        private readonly _graphics: T['graphics'];
        private readonly _viewSize?: Utils.Vector;

        private readonly _collections: Map<Visualizer.Graphics.GraphicCollectionsGeneral, (graphic: Visualizer.Graphics.BaseGraphicGeneral) => void>;

        protected constructor(args: GraphicsManagerArgsType<T>){
            this._element = args.element;
            this._graphics = args.graphics;

            this._collections = this._createCollectionsMap();

            if ('viewSize' in args && !(this._element instanceof BaseItem)){
                this._viewSize = args.viewSize;
            }
        }

        public get viewSize(): Readonly<Utils.Vector>{
            if (this._viewSize === undefined){
                throw new Errors.DesignError(`Графічний менеджер "${this.constructor.name}" не має поля "viewSize".`);
            }

            return this._viewSize;
        }

        public setVisible(isVisible: boolean, items?: BaseItem<IItem>[]){
            this._setVisibleElement(isVisible);
            this._setVisibleItems(isVisible, items);
            this._setCollectionsCallbacks(isVisible);
        }

        protected _getGraphic<K extends keyof T['graphics']>(graphic: K): T['graphics'][K]{
            return this._graphics[graphic];
        }

        private _createCollectionsMap(): Map<Visualizer.Graphics.GraphicCollectionsGeneral, (graphic: Visualizer.Graphics.BaseGraphicGeneral) => void>{
            const collections = new Map<Visualizer.Graphics.GraphicCollectionsGeneral, (graphic: Visualizer.Graphics.BaseGraphicGeneral) => void>();

            for (const name in this._graphics){
                const collection = this._graphics[name];

                if (collection instanceof Visualizer.Graphics.GraphicCollection){
                    collections.set(collection, (graphic) => {
                        if (collection.has(graphic)){
                            Visualizer.Graphics.insert(graphic);
                        }
                        else Visualizer.Graphics.extract(graphic);
                    });
                }
                else if (collection instanceof Visualizer.Graphics.GraphicMap){
                    collections.set(collection, (graphic) => {
                        if (collection.hasValue(graphic)){
                            Visualizer.Graphics.insert(graphic);
                        }
                        else Visualizer.Graphics.extract(graphic);
                    });
                }
            }

            return collections;
        }

        private _setVisibleElement(isVisible: boolean){
            if (isVisible && this._viewSize !== undefined){
                Visualizer.Graphics.setViewSize(this._viewSize);
            }

            for (const name of Object.keys(this._graphics) as (keyof T['graphics'])[]){
                const graphic = this._graphics[name]!;

                if (isVisible){
                    Visualizer.Graphics.insert(graphic);
                }
                else Visualizer.Graphics.extract(graphic);
            }
        }

        private _setVisibleItems(isVisible: boolean, items?: BaseItem<IItem>[]){
            if (items !== undefined){
                for (const item of items){
                    item.graphicsManager.setVisible(isVisible);
                }
            }
        }

        private _setCollectionsCallbacks(isVisible: boolean){
            for (const [collection, callback] of this._collections){
                if (isVisible){
                    collection.addChangeListener(callback);
                }
                else collection.removeChangeListener(callback);
            }
        }
    }
}