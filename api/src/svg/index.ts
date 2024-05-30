/// <reference path="items.ts" />

namespace StructVisorAPI.SVG{
    const domParser = new DOMParser();

    function createSvgElement(name: keyof typeof Items): HTMLElement{
        return domParser.parseFromString(Items[name], 'image/svg+xml').documentElement;
    }

    function copyAttributes(sender: Element, receiver: Element){
        for (const attribute of sender.attributes){
            if (!receiver.hasAttribute(attribute.name)){
                receiver.setAttribute(attribute.name, attribute.value);
            }
        }
    }

    function setViewBox(target: Element){
        const viewString = target.getAttribute(UI.Attributes['svg-view']);

        if (viewString !== null){
            if (viewString.match(/^\d{1,2} \d{1,2}$/) === null){
                throw new Errors.SVGError(`Значення SVG-атрибута "${UI.Attributes['svg-name']}" було вказано некоректно.`);
            }
            
            const viewSplit = viewString.split(' ').map((value) => Number(value)) as [number, number];
    
            const width = Number(target.getAttribute('width'));
            const height = Number(target.getAttribute('height'));
            
            const percentLeft = (100 - viewSplit[0]) / 2;
            const percentTop = (100 - viewSplit[1]) / 2;
    
            const newLeft = Utils.round(width / 100 * percentLeft, 2);
            const newTop = Utils.round(height / 100 * percentTop, 2);
            const newWidth = Utils.round(newLeft * 2 + width, 2);
            const newHeight = Utils.round(newTop * 2 + height, 2);
    
            target.setAttribute('viewBox', `${-newLeft} ${-newTop} ${newWidth} ${newHeight}`);
        }
    }

    function clearAttributes(target: Element){
        target.removeAttribute(UI.Attributes['svg-name']);
        target.removeAttribute(UI.Attributes['svg-view']);
    }

    export function initialize(){
        for (const svgElement of document.querySelectorAll('svg[' + UI.Attributes['svg-name'] + ']')){
            const svgElementName = svgElement.getAttribute(UI.Attributes['svg-name']) as keyof typeof Items;

            if (!(svgElementName in Items)){
                throw new Errors.SVGError(`SVG-елемент з назвою "${svgElementName}" не було визначено.`);
            }

            const senderSvgElement = createSvgElement(svgElementName);
            svgElement.innerHTML = senderSvgElement.innerHTML;

            copyAttributes(senderSvgElement, svgElement);
            setViewBox(svgElement);
            
            clearAttributes(svgElement);
        }
    }
}