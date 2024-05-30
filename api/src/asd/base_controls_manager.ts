namespace StructVisorAPI.ASD{
    export abstract class BaseControlsManager<T extends IStructure | IAlgorithm<IStructure>>{
        protected readonly _asd: T['class'];

        private readonly _controls: ControlsStructuredType<T>;
        private readonly _controlBoxes: ControlsBoxesStructuredType<T>;

        private __isActionExecuting: boolean;

        private readonly _savedControlsStatuses: Map<Visualizer.Controls.BaseControlGeneral, Visualizer.Controls.ControlStatusType>;

        protected constructor(args: {asd: T['class'], controls: ControlsStructuredType<T>}){
            this._asd = args.asd;

            this._controls = args.controls;
            this._controlBoxes = this._createControlBoxes();

            this.__isActionExecuting = false;
            this._savedControlsStatuses = new Map();
        }

        protected get _isActionExecuting(): boolean{
            return this.__isActionExecuting;
        }

        public setVisible(isVisible: boolean){
            for (const name of Object.keys(this._controlBoxes) as (keyof T['controls'])[]){
                if (isVisible){
                    Visualizer.Controls.insert(this._controlBoxes[name]);
                }
                else Visualizer.Controls.extract(this._controlBoxes[name]);
            }
        }

        protected _getControl<K extends keyof T['controls'], V extends keyof T['controls'][K]>(category: K, control: V): T['controls'][K][V]{
            return this._controls[category]!.items[control];
        }

        protected _getControls(category?: keyof T['controls']): Set<Visualizer.Controls.BaseControlGeneral>{
            const controls = new Set<Visualizer.Controls.BaseControlGeneral>();

            for (const controlBox of Object.keys(this._controls)){
                if (category === undefined || controlBox === category){
                    for (const controlName of Object.keys(this._controls[controlBox]!.items)){
                        controls.add(this._controls[controlBox]!.items[controlName]!);
                    }
                }
            }

            return controls;
        }

        protected _toggleActionExecuting(...exclusionControls: Visualizer.Controls.BaseControlGeneral[]){
            this.__isActionExecuting = !this.__isActionExecuting;

            for (const control of this._getControls()){
                if (!exclusionControls.includes(control)){
                    if (this.__isActionExecuting){
                        this._savedControlsStatuses.set(control, control.status);
                    }

                    control.status = this.__isActionExecuting ? 'disabled' : this._savedControlsStatuses.get(control) ?? control.status;
                }
            }
        }

        private _createControlBoxes(): ControlsBoxesStructuredType<T>{
            const controlBoxes: Partial<ControlsBoxesStructuredType<T>> = {};

            for (const controlCategory of Object.keys(this._controls) as (keyof T['controls'])[]){
                controlBoxes[controlCategory] = new Visualizer.Controls.ControlBox(this._controls[controlCategory].title);

                for (const control of this._getControls(controlCategory)){
                    control.insertTo(controlBoxes[controlCategory]!);
                }
            }

            return controlBoxes as ControlsBoxesStructuredType<T>;
        }
    }
}