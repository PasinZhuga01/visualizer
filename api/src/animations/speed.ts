namespace StructVisorAPI.Animations.Speed{
    export const MIN_PERCENT = 0;
    export const MAX_PERCENT = 100;

    const range = UI.Elements['animation-speed-range'];
    const slider = UI.Elements['animation-speed-slider'];

    let isActiveSliderControllerMoving = false;
    let percent = MIN_PERCENT;

    function startSliderControllerMove(event: MouseEvent | TouchEvent){
        isActiveSliderControllerMoving = true;
        sliderControllerMove(event);
    }

    function sliderControllerMove(event: MouseEvent | TouchEvent){
        if (isActiveSliderControllerMoving){
            event.preventDefault();

            const x = (event instanceof MouseEvent) ? event.x : event.touches[0]!.clientX;
            const difference = x - range.getBoundingClientRect().left - slider.offsetWidth / 2;

            setPercent(difference / (range.offsetWidth / MAX_PERCENT));

            slider.focus();
        }
    }

    function stopSliderControllerMove(){
        isActiveSliderControllerMoving = false;
    }

    function sliderKeyMove(event: KeyboardEvent){
        if (document.activeElement === slider){
            if (event.code === 'ArrowLeft'){
                setPercent(percent - 1);
            }
            else if (event.code === 'ArrowRight'){
                setPercent(percent + 1);
            }
        }
    }

    export function getPercent(): number{
        return percent;
    }

    export function setPercent(value: number){
        percent = Utils.clamp(value, [MIN_PERCENT, MAX_PERCENT]);
        Storage.setItem('animation-speed', percent);

        slider.style.left = `${percent}%`;
        slider.style.right = '';

        if (slider.offsetLeft + slider.offsetWidth >= range.offsetWidth){
            slider.style.left = '';
            slider.style.right = '0';
        }
    }

    export function initialize(){
        setPercent(Storage.getItem('animation-speed'));

        slider.tabIndex = 0;
        slider.style.position = 'absolute';

        range.style.position = 'relative';
        range.appendChild(slider);
        range.removeAttribute(UI.Attributes['is-animation-speed-range']);
        range.addEventListener('mousedown', (event) => startSliderControllerMove(event));
        range.addEventListener('touchstart', (event) => startSliderControllerMove(event));

        window.addEventListener('mousemove', (event) => sliderControllerMove(event));
        window.addEventListener('touchmove', (event) => sliderControllerMove(event));

        window.addEventListener('mouseup', () => stopSliderControllerMove());
        window.addEventListener('touchend', () => stopSliderControllerMove());

        window.addEventListener('keydown', (event) => sliderKeyMove(event));
    }
}