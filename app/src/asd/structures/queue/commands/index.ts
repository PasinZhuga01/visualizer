/// <reference path="enqueue_command.ts" />
/// <reference path="dequeue_command.ts" />
/// <reference path="clear_command.ts" />

namespace App.ASD.Structures.Commands{
    export interface IQueueEnqueueCommand extends ICommand<IQueue>{
        name: 'enqueue';
        class: QueueEnqueueCommand;
        object: {title: string};
    }

    export interface IQueueDequeuePopCommand extends ICommand<IQueue>{
        name: 'dequeue';
        class: QueueDequeueCommand;
        object: {};
    }
}