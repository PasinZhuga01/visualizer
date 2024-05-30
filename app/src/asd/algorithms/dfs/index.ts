/// <reference path="algorithm.ts" />
/// <reference path="graphics_manager.ts" />

/// <reference path="commands/index.ts" />

namespace App.ASD.Algorithms{
    export interface IDFS extends IGraphTraversal{
        class: DFS;
        graphics: {};
    }
}