namespace StructVisorAPI.Visualizer.Graphics{
    export type ColorType = typeof Theme.dynamicColor | string | null;

    export type BaseGraphicGeneral = BaseGraphic<IBaseGraphicOptions>;
    export type GraphicCollectionGeneral = GraphicCollection<BaseGraphicGeneral>;
    export type GraphicMapGeneral = GraphicMap<any, BaseGraphicGeneral>;
    export type GraphicCollectionsGeneral = GraphicCollectionGeneral | GraphicMapGeneral;
    
    export interface IBaseGraphicOptions{
        isVisible: boolean;
        fillColor: ColorType;
        strokeColor: ColorType;
        strokeWidth: number;
    }
}