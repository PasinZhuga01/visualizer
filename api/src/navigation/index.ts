/// <reference path="item.ts" />
/// <reference path="subitem.ts" />

namespace StructVisorAPI.Navigation{
    let isVisible = false;

    function setVisible(value: boolean){
        isVisible = value;

        Storage.setItem('is-navigation-visible', isVisible);
        UI.Elements['navigation'].style.width = isVisible ? '20vw' : '0';
    }

    function search(text: string){
        for (const item of Item.list){
            item.displayFromSearch(text);
        }
    }

    export function initialize(){
        setVisible(Storage.getItem('is-navigation-visible'))

        UI.Elements['navigation-toggle'].addEventListener('click', () => setVisible(!isVisible));
        UI.Elements['navigation-search'].addEventListener('input', () => search(UI.Elements['navigation-search'].value));
    }
}