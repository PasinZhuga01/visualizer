/// <reference path="command.ts" />

namespace App.ASD.Algorithms.Commands{
    export interface IDijkstraCommand extends IGraphTraversalCommand{
        name: 'dijkstra';
        class: DijkstraCommand;
    }
}