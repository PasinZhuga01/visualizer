/// <reference path="command.ts" />

namespace App.ASD.Algorithms.Commands{
    export interface IDFSCommand extends IGraphTraversalCommand{
        name: 'dfs';
        class: DFSCommand;
    }
}