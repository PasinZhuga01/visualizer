namespace App.Visual{
    export namespace Controls{
        export import IBaseControlOptions = StructVisorAPI.Visualizer.Controls.IBaseControlOptions;
        export import BaseControl = StructVisorAPI.Visualizer.Controls.BaseControl;

        export import ControlStatusType = StructVisorAPI.Visualizer.Controls.ControlStatusType;
    }

    export namespace Graphics{
        export import IBaseGraphicOptions = StructVisorAPI.Visualizer.Graphics.IBaseGraphicOptions;
        export import BaseGraphic = StructVisorAPI.Visualizer.Graphics.BaseGraphic;
        export import GraphicCollection = StructVisorAPI.Visualizer.Graphics.GraphicCollection;
        export import GraphicMap = StructVisorAPI.Visualizer.Graphics.GraphicMap;
    
        export import ColorType = StructVisorAPI.Visualizer.Graphics.ColorType;
        
        export import getViewSize = StructVisorAPI.Visualizer.Graphics.getViewSize;
    
        export import addEventListener = StructVisorAPI.Visualizer.Graphics.addEventListener;
        export import removeEventListener = StructVisorAPI.Visualizer.Graphics.removeEventListener;
        export import clearEventListener = StructVisorAPI.Visualizer.Graphics.clearEventListeners;
    
        export import checkDisplay = StructVisorAPI.Visualizer.Graphics.checkDisplay;
        export import convertToCanvasPosition = StructVisorAPI.Visualizer.Graphics.convertToCanvasPosition;
        export import insert = StructVisorAPI.Visualizer.Graphics.insert;
        export import extract = StructVisorAPI.Visualizer.Graphics.extract;
    
        export import moveToFront = StructVisorAPI.Visualizer.Graphics.moveToFront;
    }
}