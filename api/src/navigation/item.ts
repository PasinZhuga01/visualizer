namespace StructVisorAPI.Navigation{
    export class Item{
        private static readonly _list: Set<Item> = new Set();

        private readonly _title: string;
        private readonly _subItems: Set<SubItem>;

        private readonly _htmlElements: Readonly<{fullBlock: HTMLLIElement; titleBlock: HTMLSpanElement; subList: HTMLUListElement}>;

        public constructor(title: string, onclick?: () => void){
            this._title = title;
            this._subItems = new Set();

            this._htmlElements = {
                fullBlock: document.createElement('li'),
                titleBlock: document.createElement('span'),
                subList: document.createElement('ul')
            };

            this._htmlElements.titleBlock.className = 'asd-title';
            this._htmlElements.titleBlock.innerText = title;

            this._htmlElements.fullBlock.appendChild(this._htmlElements.titleBlock);
            this._htmlElements.fullBlock.appendChild(this._htmlElements.subList);

            if (onclick !== undefined){
                this._htmlElements.titleBlock.addEventListener('click', onclick);
            }

            Item._list.add(this);
            UI.Elements['asd-list'].appendChild(this._htmlElements.fullBlock);
        }

        public static get list(): Readonly<Set<Item>>{
            return this._list;
        }

        public insertSubItem(title: string, onclick?: () => void){
            const subItem = new SubItem(title, onclick);

            this._subItems.add(subItem);
            this._htmlElements.subList.appendChild(subItem.htmlElement);
        }

        public displayFromSearch(text: string){
            let isFullVisibled = Utils.includesWithIgnoreCase(this._title, text);

            this._htmlElements.fullBlock.style.display = isFullVisibled ? 'list-item' : 'none';

            for (const subItem of this._subItems){
                subItem.htmlElement.style.display = (isFullVisibled || Utils.includesWithIgnoreCase(subItem.htmlElement.innerText, text)) ? 'list-item' : 'none';

                if (subItem.htmlElement.style.display === 'list-item'){
                    this._htmlElements.fullBlock.style.display = 'list-item';
                }
            }
        }
    }
}