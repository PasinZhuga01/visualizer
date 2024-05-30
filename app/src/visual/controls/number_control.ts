namespace App.Visual.Controls{
    export class NumberControl extends BaseControl<HTMLInputElement, INumberControlOptions>{
        public constructor(options: Utils.PartialExceptType<INumberControlOptions, 'placeholder'>){
            super(options);
            this._setOptions(options);
        }

        public get value(): number{
            return Number(this._htmlElement.value);
        }

        public set value(value: number){
            this._htmlElement.value = String(value);
            this._validateValue();
        }

        public get placeholder(): string{
            return this._htmlElement.placeholder;
        }

        public set placeholder(placeholder: string){
            this._htmlElement.placeholder = placeholder;
        }

        protected _setOptions(options: Partial<INumberControlOptions>){
            if ('value' in options){
                this.value = options.value;
            }
            if ('placeholder' in options){
                this.placeholder = options.placeholder;
            }
            if ('min' in options){
                this._htmlElement.min = String(options.min);
            }
            if ('max' in options){
                this._htmlElement.max = String(options.max);
            }
        }

        protected _createHtmlElement(options: Utils.PartialExceptType<INumberControlOptions, 'placeholder'>): HTMLInputElement{
            const htmlElement = document.createElement('input');
            htmlElement.type = 'number';
            htmlElement.placeholder = options.placeholder;
            htmlElement.classList.add('standard-input');
            htmlElement.addEventListener('change', () => this._validateValue());

            return htmlElement;
        }

        private _validateValue(){
            const value = Number(this._htmlElement.value);

            const min = Number(this._htmlElement.min);
            const max = Number(this._htmlElement.max);

            if (this._htmlElement.min.length > 0 && value < min){
                this.value = min;
            }
            else if (this._htmlElement.max.length > 0 && value > max){
                this.value = max;
            }
        }
    }
}