/// <reference path="types_and_interfaces.ts" />

/// <reference path="control_box.ts" />
/// <reference path="base_control.ts" />

namespace StructVisorAPI.Visualizer.Controls{
    export function insert(...controlBoxes: ControlBox[]){
        for (const controlBox of controlBoxes){
            controlBox.insertSelf();
        }
    }

    export function extract(...controlBoxes: ControlBox[]){
        for (const controlBox of controlBoxes){
            controlBox.extractSelf();
        }
    }

    export function extractAll(){
        while (UI.Elements['asd-control-section'].childElementCount > 0){
            UI.Elements['asd-control-section'].removeChild(UI.Elements['asd-control-section'].firstChild!);
        }
    }
}