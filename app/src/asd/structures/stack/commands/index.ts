/// <reference path="push_command.ts" />
/// <reference path="pop_command.ts" />
/// <reference path="clear_command.ts" />

namespace App.ASD.Structures.Commands{
    export interface IStackPushCommand extends ICommand<IStack>{
        name: 'push';
        class: StackPushCommand;
        object: {title: string};
    }

    export interface IStackPopCommand extends ICommand<IStack>{
        name: 'pop';
        class: StackPopCommand;
        object: {};
    }
}