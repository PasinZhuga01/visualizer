namespace App.Visual.Controls.Items{
    export class SelectControlItem<T>{
        public readonly target: T;
        
        private _isInserted: boolean;
        private readonly _htmlElement: HTMLOptionElement;

        public constructor(target: T){
            this.target = target;

            this._isInserted = false;
            
            this._htmlElement = document.createElement('option');
            this._htmlElement.innerText = String(target);
        }

        public checkHtmlElementReference(htmlElement: HTMLOptionElement): boolean{
            return this._htmlElement === htmlElement;
        }

        public insertTo(control: SelectControl<T>){
            if (!this._isInserted){
                this._isInserted = true;
                control.insert(this, this._htmlElement);
            }
        }

        public extractFrom(control: SelectControl<T>){
            if (this._isInserted){
                this._isInserted = false;
                control.insert(this, this._htmlElement);
            }
        }
    }
}