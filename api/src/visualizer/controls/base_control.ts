namespace StructVisorAPI.Visualizer.Controls{
    export abstract class BaseControl<T extends HTMLElement, O extends IBaseControlOptions>{
        protected readonly _htmlElement: T;

        protected constructor(options: Partial<O>){
            this._htmlElement = this._createHtmlElement(options);
            this.setOptions(options);
        }

        public get isVisible(): boolean{
            return this._htmlElement.style.display !== 'none';
        }

        public set isVisible(isVisible: boolean){
            this._htmlElement.style.display = isVisible ? '' : 'none';
        }

        public get status(): ControlStatusType{
            if (this._htmlElement.classList.contains('executed')){
                return 'executed';
            }
            else if (this._htmlElement.classList.contains('disabled')){
                return 'disabled';
            }

            return 'available';
        }

        public set status(status: ControlStatusType){
            if ('disabled' in this._htmlElement && typeof this._htmlElement.disabled === 'boolean'){
                this._htmlElement.disabled = (status === 'disabled');
            }

            this._htmlElement.classList.remove('executed', 'disabled');
            
            if (status !== 'available'){
                this._htmlElement.classList.add(status);
            }
        }

        public checkHtmlElementReference(htmlElement: T): boolean{
            return this._htmlElement === htmlElement;
        }

        public insertTo(controlBox: ControlBox){
            controlBox.insert(this, this._htmlElement);
        }

        public extractFrom(controlBox: ControlBox){
            controlBox.extract(this, this._htmlElement);
        }

        public setOptions(options: Partial<O>){
            if ('isVisible' in options){
                this.isVisible = options.isVisible;
            }
            if ('status' in options){
                this.status = options.status;
            }

            this._setOptions(options);
        }

        protected abstract _createHtmlElement(options: Partial<IBaseControlOptions>): T;

        protected abstract _setOptions(options: Partial<O>): void;
    }
}