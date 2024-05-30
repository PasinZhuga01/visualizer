/// <reference path="imports.ts" />

/// <reference path="visual/index.ts" />
/// <reference path="asd/index.ts" />

namespace App{
    new ASD.Structures.Stack();
    new ASD.Structures.Queue();

    export const graph = new ASD.Structures.Graph();
    
    new ASD.Algorithms.DFS(graph);
    new ASD.Algorithms.BFS(graph);
    new ASD.Algorithms.Dijkstra(graph);

    StructVisorAPI.initialize();
}