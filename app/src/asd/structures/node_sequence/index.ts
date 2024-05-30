/// <reference path="structure.ts" />
/// <reference path="graphics_manager.ts" />

/// <reference path="commands/index.ts" />

namespace App.ASD.Structures{
    /**
     * Інтерфейс структури послідовності вузлів
     * @property {[Commands.INodeSequenceClearCommand, ...ICommand<INodeSequence>[]]} commands - команди структури.
     * @property {object} controls - контроли структури.
     * @property {object} graphics - графічні елементи структури.
     * @property {NodeSequence<INodeSequence>} class - клас структури.
     */
    export interface INodeSequence extends IStructure{
        item: Items.INodeItem;
        class: NodeSequence<INodeSequence>;
        commands: [Commands.INodeSequenceClearCommand, ...ICommand<INodeSequence>[]];
        controls: {
            'general': {
                'input-item': Visual.Controls.TextControl;
                'clear': Visual.Controls.ButtonControl;
            }
        }
    }
}