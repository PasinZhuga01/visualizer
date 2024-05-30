/// <reference path="command.ts" />

/// <reference path="clear_command.ts" />

namespace App.ASD.Structures.Commands{
    export interface INodeSequenceClearCommand extends ICommand<INodeSequence>{
        name: 'clear';
        class: NodeSequenceClearCommand;
        object: {};
    }
}