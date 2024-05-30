/// <reference path="algorithm.ts" />
/// <reference path="controls_manager.ts" />
/// <reference path="graphics_manager.ts" />

/// <reference path="commands/index.ts" />

namespace App.ASD.Algorithms{
    /**
     * Інтерфейс алгоритму обходу графа
     * @property {object} graphics - графічні елементи алгоритму.
     * @property {GraphTraversal} class - клас алгоритму.
     */
    export interface IGraphTraversal extends IAlgorithm<Structures.IGraph>{
        class: GraphTraversal;
        controls: {
            'general': {
                'input-start-item': Visual.Controls.TextControl;
                'input-last-item': Visual.Controls.TextControl;
                'start': Visual.Controls.ButtonControl;
            }
        }
    }
}