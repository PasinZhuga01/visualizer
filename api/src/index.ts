/// <reference path="instructions/index.ts" />
/// <reference path="storage/index.ts" />
/// <reference path="errors/index.ts" />
/// <reference path="utils/index.ts" />
/// <reference path="svg/index.ts" />
/// <reference path="ui/index.ts" />
/// <reference path="theme/index.ts" />
/// <reference path="navigation/index.ts" />
/// <reference path="animations/index.ts" />
/// <reference path="visualizer/index.ts" />
/// <reference path="asd/index.ts" />

namespace StructVisorAPI{
    export function initialize(){
        SVG.initialize();
        Storage.initialize();
        Theme.initialize();
        Navigation.initialize();
        Instructions.initialize();
        Animations.initialize();

        ASD.initialize();
    }
}