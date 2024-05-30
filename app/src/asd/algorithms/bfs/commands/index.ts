/// <reference path="command.ts" />

namespace App.ASD.Algorithms.Commands{
    export interface IBFSCommand extends IGraphTraversalCommand{
        name: 'bfs';
        class: BFSCommand;
    }
}