/// <reference path="command.ts" />

namespace App.ASD.Algorithms.Commands{
    /**
     * Інтерфейс команди алгоритму обходу графа
     * @property {string} name - назва команди.
     * @property {GraphTraversalCommand<IGraphTraversalCommand>} class - клас команди.
     */
    export interface IGraphTraversalCommand extends ICommand<Structures.IGraph>{
        class: GraphTraversalCommand<IGraphTraversalCommand>;
        object: {startIndex: number, lastIndex: number};
    }
}