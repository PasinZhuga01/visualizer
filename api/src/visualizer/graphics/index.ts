/// <reference path="types_and_interfaces.ts" />

/// <reference path="base_graphic.ts" />
/// <reference path="graphic_collection.ts" />
/// <reference path="graphic_map.ts" />

namespace StructVisorAPI.Visualizer.Graphics{
    const bounds = new Utils.Bounds();
    const context = UI.Elements['visualizer-canvas'].getContext('2d')!;
    const listeners: Partial<{[K in keyof HTMLElementEventMap]: Set<(this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => void>}> = {};
    
    let displayed = new Set<BaseGraphicGeneral>();

    export function getViewSize(): Utils.Vector{
        return bounds.sizeCopy();
    }

    export function setViewSize(size: Utils.Vector){
        bounds.width = size.x;
        bounds.height = size.y;

        UI.Elements['visualizer-canvas'].width = bounds.width;
        UI.Elements['visualizer-canvas'].height = bounds.height;

        render();
    }

    export function addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => void){
        if (!(type in listeners)){
            listeners[type] = new Set() as any;
        }

        listeners[type]!.add(listener);

        UI.Elements['visualizer-canvas'].addEventListener(type, listener);
    }

    export function removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLCanvasElement, ev: HTMLElementEventMap[K]) => void){
        if (type in listeners){
            listeners[type]!.delete(listener);

            if (listeners[type]!.size === 0){
                delete listeners[type];
            }
        }

        UI.Elements['visualizer-canvas'].removeEventListener(type, listener);
    }

    export function clearEventListeners(){
        for (const type of Object.keys(listeners) as (keyof typeof listeners)[]){
            for (const listener of listeners[type]!){
                removeEventListener(type as keyof HTMLElementEventMap, listener as any);
            }
        }
    }

    export function convertToCanvasPosition(position: Utils.Vector): Utils.Vector{
        return new Utils.Vector(
            position.x * (UI.Elements['visualizer-canvas'].width / UI.Elements['visualizer-canvas'].offsetWidth),
            position.y * (UI.Elements['visualizer-canvas'].height / UI.Elements['visualizer-canvas'].offsetHeight)
        );
    }

    export function normalizeBoundsForRender(bounds: Utils.Bounds): Utils.Bounds{
        return new Utils.Bounds(
            Math.ceil(bounds.width + (bounds.x - Math.floor(bounds.x))),
            Math.ceil(bounds.height + (bounds.y - Math.floor(bounds.y))),
            Math.floor(bounds.x),
            Math.floor(bounds.y)
        );
    }

    export function render(...targetBoundsList: Utils.Bounds[]){
        targetBoundsList = (targetBoundsList.length > 0) ? targetBoundsList : [bounds];

        for (const targetBounds of targetBoundsList){
            const targetBoundsRounded = normalizeBoundsForRender(targetBounds);

            if (targetBoundsRounded.checkCollide(bounds)){
                context.clearRect(targetBoundsRounded.x, targetBoundsRounded.y, targetBoundsRounded.width, targetBoundsRounded.height);

                for (const graphic of displayed){
                    const graphicBoundsRounded = normalizeBoundsForRender(graphic.bounds);

                    if (graphicBoundsRounded.checkCollide(targetBoundsRounded)){
                        context.save();

                        context.beginPath();
                        context.rect(targetBoundsRounded.x, targetBoundsRounded.y, targetBoundsRounded.width, targetBoundsRounded.height);
                        context.clip();

                        context.beginPath();
                        context.rect(graphicBoundsRounded.x, graphicBoundsRounded.y, graphicBoundsRounded.width, graphicBoundsRounded.height);
                        context.clip();

                        graphic.render(context);

                        context.restore();
                    }
                }
            }
        }
    }

    export function checkDisplay(graphic: BaseGraphicGeneral): boolean{
        return displayed.has(graphic);
    }

    export function insert(...targets: (BaseGraphicGeneral | GraphicCollection<BaseGraphicGeneral> | GraphicMap<any, BaseGraphicGeneral>)[]){
        for (const target of targets){
            if (target instanceof GraphicCollection){
                insert(...target);
            }
            else if (target instanceof GraphicMap){
                for (const entry of target){
                    insert(entry[1]);
                }
            }
            else if (!displayed.has(target)){
                displayed.add(target);    
                render(target.bounds);
            }
        }
    }

    export function extract(...targets: (BaseGraphicGeneral | GraphicCollection<BaseGraphicGeneral> | GraphicMap<any, BaseGraphicGeneral>)[]){
        for (const target of targets){
            if (target instanceof GraphicCollection){
                extract(...target);
            }
            else if (target instanceof GraphicMap){
                for (const entry of target){
                    extract(entry[1]);
                }
            }
            else if (displayed.has(target)){
                displayed.delete(target);
                render(target.bounds);
            }
            
        }
    }

    export function extractAll(){
        for (const graphic of displayed.keys()){
            extract(graphic);
        }
    }

    export function moveToFront(...graphics: BaseGraphicGeneral[]){
        const boundsList: Utils.Bounds[] = [];

        for (const graphic of graphics){
            if (displayed.has(graphic)){
                displayed.delete(graphic);
                displayed.add(graphic);

                boundsList.push(graphic.bounds);
            }
        }

        render(...boundsList);
    }

    export function moveToBack(...graphics: BaseGraphicGeneral[]){
        const boundsList: Utils.Bounds[] = [];
        const filteredGraphics: BaseGraphicGeneral[] = [];

        for (const graphic of graphics){
            if (displayed.has(graphic)){
                filteredGraphics.push(graphic);
                boundsList.push(graphic.bounds);
            }
        }

        displayed = new Set(filteredGraphics.concat(...displayed));
        render(...boundsList);
    }
}