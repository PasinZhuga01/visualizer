/// <reference path="add_vertex_command.ts" />
/// <reference path="remove_vertex_command.ts" />
/// <reference path="clear_vertices_command.ts" />

/// <reference path="connect_vertices_command.ts" />
/// <reference path="disconnect_vertices_command.ts" />
/// <reference path="clear_connections_command.ts" />

namespace App.ASD.Structures.Commands{
    export interface IGraphAddVertexCommand extends ICommand<IGraph>{
        name: 'add-vertex';
        class: GraphAddVertexCommand;
        object: {title: string, center: Utils.VectorObjectType};
    }

    export interface IGraphRemoveVertexCommand extends ICommand<IGraph>{
        name: 'remove-vertex';
        class: GraphRemoveVertexCommand;
        object: {index: number};
    }

    export interface IGraphClearVerticesCommand extends ICommand<IGraph>{
        name: 'clear-vertices';
        class: GraphClearVerticesCommand;
        object: {};
    }

    export interface IGraphConnectVerticesCommand extends ICommand<IGraph>{
        name: 'connect-vertices';
        class: GraphConnectVerticesCommand;
        object: {startIndex: number, lastIndex: number, weight: number, isOriented: boolean};
    }

    export interface IGraphDisconnectVerticesCommand extends ICommand<IGraph>{
        name: 'disconnect-vertices';
        class: GraphDisconnectVerticesCommand;
        object: {startIndex: number, lastIndex: number};
    }

    export interface IGraphClearConnectionsCommand extends ICommand<IGraph>{
        name: 'clear-connections';
        class: GraphClearConnectionsCommand;
        object: {};
    }
}