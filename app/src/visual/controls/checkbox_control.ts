namespace App.Visual.Controls{
    export class CheckboxControl extends BaseControl<HTMLDivElement, ICheckboxControlOptions>{
        public constructor(options: Utils.PartialExceptType<ICheckboxControlOptions, 'value'>){
            super(options);
        }

        public get isChecked(): boolean{
            return this._htmlElement.classList.contains('checked');
        }

        public set isChecked(isChecked: boolean){
            if (this.isChecked !== isChecked){
                this._htmlElement.classList.toggle('checked');
            }
        }

        protected _setOptions(options: Partial<Omit<ICheckboxControlOptions, 'oncheck' | 'value'>>){
            if ('isChecked' in options){
                this.isChecked = options.isChecked;
            }
        }

        protected _createHtmlElement(options: Utils.PartialExceptType<ICheckboxControlOptions, 'value'>): HTMLDivElement{
            const blockHtmlElement = document.createElement('div');
            const inputHtmlElement = document.createElement('div');
            const valueHtmlElement = document.createElement('div');

            blockHtmlElement.classList.add('standard-checkbox');
            inputHtmlElement.classList.add('standard-checkbox-input');
            valueHtmlElement.classList.add('standard-checkbox-value');

            blockHtmlElement.appendChild(inputHtmlElement);
            blockHtmlElement.appendChild(valueHtmlElement);

            valueHtmlElement.innerText = options.value;
            inputHtmlElement.addEventListener('click', () => this.isChecked = !this.isChecked);
            inputHtmlElement.addEventListener('touchstart', () => this.isChecked = !this.isChecked);

            if (options.oncheck !== undefined){
                inputHtmlElement.addEventListener('click', options.oncheck);
                inputHtmlElement.addEventListener('touchstart', options.oncheck);
            }
            
            return blockHtmlElement;
        }
    }
}