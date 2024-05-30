/// <reference path="structure.ts" />
/// <reference path="controls_manager.ts" />
/// <reference path="graphics_manager.ts" />
/// <reference path="progress_loader.ts" />

/// <reference path="commands/index.ts" />

namespace App.ASD.Structures{
    export interface IStack extends INodeSequence{
        class: Stack;
        commands: [
            Commands.INodeSequenceClearCommand,
            Commands.IStackPushCommand,
            Commands.IStackPopCommand
        ],
        controls: {
            'general': {
                'input-item': Visual.Controls.TextControl;
                'push': Visual.Controls.ButtonControl;
                'pop': Visual.Controls.ButtonControl;
                'clear': Visual.Controls.ButtonControl;
            }
        },
        graphics: {
            'top-arrow': Visual.Graphics.Line;
            'top-text': Visual.Graphics.Text;
            'top-rectangle': Visual.Graphics.LinkRectangle;
            'output-text': Visual.Graphics.Text;
        }
    }
}