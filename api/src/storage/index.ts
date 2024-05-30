/// <reference path="types.ts" />
/// <reference path="clear.ts" />
/// <reference path="initial_items.ts" />

namespace StructVisorAPI.Storage{
    function initializeItems(){
        for (const itemKey of Object.keys(InitialItems) as ItemNameType[]){
            if (!(itemKey in localStorage)){
                resetItem(itemKey);
            }
        }
    }

    export function getItem<K extends ItemNameType>(name: K): typeof InitialItems[K]{
        return JSON.parse(localStorage.getItem(name)!) as typeof InitialItems[K];
    }

    export function setItem<K extends ItemNameType>(name: K, value: typeof InitialItems[K]){
        localStorage.setItem(name, JSON.stringify(value));
    }

    export function resetItem<K extends ItemNameType>(name: K){
        localStorage.setItem(name, JSON.stringify(InitialItems[name]));
    }

    export function clear(){
        localStorage.clear();
    }

    export function initialize(){
        initializeItems();
        Clear.initialize();
    }
}