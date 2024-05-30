/// <reference path="structure.ts" />
/// <reference path="controls_manager.ts" />
/// <reference path="graphics_manager.ts" />
/// <reference path="progress_loader.ts" />

/// <reference path="commands/index.ts" />

namespace App.ASD.Structures{
    export interface IGraph extends IStructure{
        item: Items.IGraphVertex;
        class: Graph;
        commands: [
            Commands.IGraphAddVertexCommand,
            Commands.IGraphRemoveVertexCommand,
            Commands.IGraphClearVerticesCommand,
            Commands.IGraphConnectVerticesCommand,
            Commands.IGraphDisconnectVerticesCommand,
            Commands.IGraphClearConnectionsCommand,
            Algorithms.Commands.IDFSCommand,
            Algorithms.Commands.IBFSCommand,
            Algorithms.Commands.IDijkstraCommand
        ];
        controls: {
            'vertices': {
                'input-vertex': Visual.Controls.TextControl;
                'add-vertex': Visual.Controls.ButtonControl;
                'remove-vertex': Visual.Controls.ButtonControl;
                'clear': Visual.Controls.ButtonControl;
            }
            'connections': {
                'toggle-visible-connections-weights': Visual.Controls.CheckboxControl;
                'input-connection-type': Visual.Controls.SelectControl<string>;
                'input-connection-weight': Visual.Controls.NumberControl;
                'connect-vertices': Visual.Controls.ButtonControl;
                'disconnect-vertices': Visual.Controls.ButtonControl;
                'clear-connections': Visual.Controls.ButtonControl;
            },
            'highlight': {
                'clear': Visual.Controls.ButtonControl;
            }
        };
    }
}