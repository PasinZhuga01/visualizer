namespace App.Visual.Controls{
    export class SelectControl<T> extends BaseControl<HTMLSelectElement, ISelectControlOptions<T>>{
        private readonly _items: Items.SelectControlItem<T>[] = [];

        public constructor(options: Partial<ISelectControlOptions<T>> = {}){
            super(options);

            for (const item of options.items ?? []){
                item.insertTo(this);
            }
        }

        public get selected(): Items.SelectControlItem<T> | null{
            return this._items[this._htmlElement.selectedIndex] ?? null;
        }

        public insert(item: Items.SelectControlItem<T>, htmlElement: HTMLOptionElement){
            if (item.checkHtmlElementReference(htmlElement)){
                this._items.push(item);
                this._htmlElement.appendChild(htmlElement);
            }
        }

        public extract(item: Items.SelectControlItem<T>, htmlElement: HTMLOptionElement){
            if (item.checkHtmlElementReference(htmlElement)){
                this._items.splice(this._items.indexOf(item), 1);
                this._htmlElement.removeChild(htmlElement);
            }
        }

        public extractAll(){
            for (const item of this._items){
                item.extractFrom(this);
            }
        }

        protected _setOptions(){}

        protected _createHtmlElement(): HTMLSelectElement{
            const htmlElement = document.createElement('select');
            htmlElement.classList.add('standard-input');

            return htmlElement;
        }
    }
}