namespace StructVisorAPI.Visualizer.Controls{
    export class ControlBox{
        private readonly _htmlElements: Readonly<{fullBlock: HTMLDivElement; titleBlock: HTMLHeadingElement; itemsBlock: HTMLDivElement}>;

        public constructor(title: string){
            this._htmlElements = {
                fullBlock: document.createElement('div'),
                titleBlock: document.createElement('h2'),
                itemsBlock: document.createElement('div')
            };

            this._htmlElements.titleBlock.innerText = title;
            this._htmlElements.itemsBlock.className = 'control-items';
            
            this._htmlElements.fullBlock.className = 'control-box';
            this._htmlElements.fullBlock.appendChild(this._htmlElements.titleBlock);
            this._htmlElements.fullBlock.appendChild(this._htmlElements.itemsBlock);
        }

        public insert<T extends HTMLElement>(control: BaseControl<T, IBaseControlOptions>, htmlElement: T){
            if (control.checkHtmlElementReference(htmlElement)){
                this._htmlElements.itemsBlock.appendChild(htmlElement);
            }
        }

        public extract<T extends HTMLElement>(control: BaseControl<T, IBaseControlOptions>, htmlElement: T){
            if (control.checkHtmlElementReference(htmlElement)){
                this._htmlElements.itemsBlock.removeChild(htmlElement);
            }
        }

        public insertSelf(){
            UI.Elements['asd-control-section'].appendChild(this._htmlElements.fullBlock);
        }

        public extractSelf(){
            UI.Elements['asd-control-section'].removeChild(this._htmlElements.fullBlock);
        }
    }
}