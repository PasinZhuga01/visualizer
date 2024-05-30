namespace StructVisorAPI.UI{
    export const Elements = {
        'instructions-section': document.getElementById('instructions-section')!,
        'instructions-tabs': document.getElementById('instructions-tabs')!,
        'instructions-tab-structure': document.getElementById('instructions-tab-structure')!,
        'instructions-tab-algorithm': document.getElementById('instructions-tab-algorithm')!,
        'instructions-frame': document.getElementById('instructions-frame') as HTMLIFrameElement,
        'instructions-open': document.getElementById('instructions-open')!,
        'instructions-close': document.getElementById('instructions-close')!,
        'navigation': document.querySelector('nav')!,
        'navigation-toggle': document.getElementById('nav-toggle')!,
        'navigation-search': document.getElementById('nav-search') as HTMLInputElement,
        'asd-list': document.getElementById('asd-list')!,
        'asd-control-section': document.getElementById('asd-control-section')!,
        'animation-step-back': document.getElementById('animation-step-back')!,
        'animation-step-forward': document.getElementById('animation-step-forward')!,
        'animation-pause': document.getElementById('animation-pause')!,
        'animation-play': document.getElementById('animation-play')!,
        'animation-skip': document.getElementById('animation-skip')!,
        'animation-speed-range': document.querySelector('[' + Attributes['is-animation-speed-range'] + ']')!,
        'animation-speed-slider': document.createElement('div'),
        'visualizer-canvas': document.getElementById('visualizer-canvas') as HTMLCanvasElement,
        'clear-storage-section': document.getElementById('clear-storage-section')!,
        'clear-storage-open': document.getElementById('clear-storage-open')!,
        'clear-storage-close': document.getElementById('clear-storage-close')!,

        'clear-storage-button': document.getElementById('clear-storage-button')!,
        'clear-storage-progress-button': document.getElementById('clear-storage-progress-button')!,
        'clear-storage-structure-progress-button': document.getElementById('clear-storage-structure-progress-button')!,

        'dark-overlay': document.getElementById('dark-overlay')!,
        'theme-toggle': document.getElementById('theme-toggle')!
    } as const satisfies Record<string, HTMLElement>;
}