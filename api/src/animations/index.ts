/// <reference path="speed.ts" />

namespace StructVisorAPI.Animations{
    function perform(type: 'undo' | 'redo' | 'skip'){
        let structure = ASD.BaseASD.selected as ASD.SelectedType;

        if (structure !== null){
            if (structure instanceof ASD.BaseAlgorithm){
                structure = structure.structure;
            }
            
            structure.perform(type);

            if (type === 'skip'){
                UI.Elements['animation-play'].style.display = 'none';
                UI.Elements['animation-pause'].style.display = 'block';
            }
        }
    }

    function togglePause(){
        let structure = ASD.BaseASD.selected as ASD.SelectedType;

        if (structure !== null){
            if (structure instanceof ASD.BaseAlgorithm){
                structure = structure.structure;
            }

            structure.perform('toggleAnimationPause');

            UI.Elements['animation-play'].style.display = structure.isAnimationPaused ? 'block' : 'none';
            UI.Elements['animation-pause'].style.display = structure.isAnimationPaused ? 'none': 'block';
        }
    }

    function initializeControls(){
        UI.Elements['animation-step-back'].addEventListener('click', () => perform('undo'));
        UI.Elements['animation-step-forward'].addEventListener('click', () => perform('redo'));
        UI.Elements['animation-pause'].addEventListener('click', () => togglePause());
        UI.Elements['animation-play'].addEventListener('click', () => togglePause());
        UI.Elements['animation-skip'].addEventListener('click', () => perform('skip'));

        UI.Elements['animation-play'].style.display = 'none';
    }

    export function initialize(){
        Speed.initialize();
        initializeControls();
    }
}