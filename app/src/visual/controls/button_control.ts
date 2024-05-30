namespace App.Visual.Controls{
    export class ButtonControl extends BaseControl<HTMLInputElement, IButtonControlOptions>{
        public constructor(options: Utils.PartialExceptType<IButtonControlOptions, 'value'>){
            super(options);
        }

        public get value(): string{
            return this._htmlElement.value;
        }

        public set value(value: string){
            this._htmlElement.value = value;
        }

        protected _setOptions(options: Partial<Omit<IButtonControlOptions, 'onclick'>>){
            if ('value' in options){
                this.value = options.value;
            }
        }

        protected _createHtmlElement(options: Utils.PartialExceptType<IButtonControlOptions, 'value'>): HTMLInputElement{
            const htmlElement = document.createElement('input');
            htmlElement.type = 'button';
            htmlElement.value = options.value;
            htmlElement.classList.add('standard-button');

            if (options.onclick !== undefined){
                htmlElement.addEventListener('click', options.onclick);
            }
            
            return htmlElement;
        }
    }
}