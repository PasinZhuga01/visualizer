/// <reference path="structure.ts" />
/// <reference path="controls_manager.ts" />
/// <reference path="graphics_manager.ts" />
/// <reference path="progress_loader.ts" />

/// <reference path="commands/index.ts" />

namespace App.ASD.Structures{
    export interface IQueue extends INodeSequence{
        class: Queue;
        commands: [
            Commands.INodeSequenceClearCommand,
            Commands.IQueueEnqueueCommand,
            Commands.IQueueDequeuePopCommand
        ],
        controls: {
            'general': {
                'input-item': Visual.Controls.TextControl;
                'enqueue': Visual.Controls.ButtonControl;
                'dequeue': Visual.Controls.ButtonControl;
                'clear': Visual.Controls.ButtonControl;
            }
        },
        graphics: {
            'head-arrow': Visual.Graphics.Line;
            'head-text': Visual.Graphics.Text;
            'head-rectangle': Visual.Graphics.LinkRectangle;
            
            'tail-arrow': Visual.Graphics.Line;
            'tail-text': Visual.Graphics.Text;
            'tail-rectangle': Visual.Graphics.LinkRectangle;
        }
    }
}