namespace App.Visual.Controls{
    export class TextControl extends BaseControl<HTMLInputElement, ITextControlOptions>{
        public constructor(options: Utils.PartialExceptType<ITextControlOptions, 'placeholder'>){
            super(options);
            this._setOptions(options);
        }

        public get placeholder(): string{
            return this._htmlElement.placeholder;
        }

        public set placeholder(placeholder: string){
            this._htmlElement.placeholder = placeholder;
        }

        public get value(): string{
            return this._htmlElement.value;
        }

        public set value(value: string){
            this._htmlElement.value = value;
        }

        protected _setOptions(options: Partial<ITextControlOptions>){
            if ('placeholder' in options){
                this.placeholder = options.placeholder;
            }
            if ('value' in options){
                this.value = options.value;
            }
        }

        protected _createHtmlElement(options: Utils.PartialExceptType<ITextControlOptions, 'placeholder'>): HTMLInputElement{
            const htmlElement = document.createElement('input');
            htmlElement.type = 'text';
            htmlElement.placeholder = options.placeholder;
            htmlElement.classList.add('standard-input');

            return htmlElement;
        }
    }
}