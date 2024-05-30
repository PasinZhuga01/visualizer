namespace App.ASD.Structures.Progress{
    export class GraphProgressLoader extends BaseProgressLoader<IGraph>{
        public constructor(structure: Graph, invoker: Invoker<IGraph>){
            super({
                structure: structure,
                invoker: invoker,
                commandsCallbacks: {
                    'add-vertex': (items, obj) => new Commands.GraphAddVertexCommand(items, obj.title, new Utils.Vector(obj.center)),
                    'remove-vertex': (items, obj) => new Commands.GraphRemoveVertexCommand(items, obj.index),
                    'clear-vertices': (items) => new Commands.GraphClearVerticesCommand(items),
                    'connect-vertices': (items, obj) => new Commands.GraphConnectVerticesCommand(items, obj.isOriented, obj.weight, obj.startIndex, obj.lastIndex),
                    'disconnect-vertices': (items, obj) => new Commands.GraphDisconnectVerticesCommand(items, obj.startIndex, obj.lastIndex),
                    'clear-connections': (items) => new Commands.GraphClearConnectionsCommand(items),
                    'dfs': (items, obj) => new Algorithms.Commands.DFSCommand(items, structure, obj.startIndex, obj.lastIndex),
                    'bfs': (items, obj) => new Algorithms.Commands.BFSCommand(items, structure, obj.startIndex, obj.lastIndex),
                    'dijkstra': (items, obj) => new Algorithms.Commands.DijkstraCommand(items, structure, obj.startIndex, obj.lastIndex)
                }
            });
        }
    }
}