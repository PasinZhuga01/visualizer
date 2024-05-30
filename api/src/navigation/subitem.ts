namespace StructVisorAPI.Navigation{
    export class SubItem{
        public readonly htmlElement: HTMLLIElement;

        public constructor(title: string, onclick?: () => void){
            this.htmlElement = document.createElement('li');
            this.htmlElement.className = 'asd-title';
            this.htmlElement.innerText = title;

            if (onclick !== undefined){
                this.htmlElement.addEventListener('click', onclick);
            }
        }
    }
}