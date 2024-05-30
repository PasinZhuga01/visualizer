namespace StructVisorAPI.Errors{
    abstract class BaseError extends Error{
        protected constructor(message: string = '', name: string = 'Error'){
            super(message);
            this.name = `Application${name}`;
        }
    }

    export class SVGError extends BaseError{
        public constructor(message: string){
            super(message, 'SVGError');
        }
    }

    export class DesignError extends BaseError{
        public constructor(message: string){
            super(message, 'DesignError');
        }
    }

    export class VisualError extends BaseError{
        public constructor(message: string){
            super(message, 'VisualError');
        }
    }

    export class ASDError extends BaseError{
        public constructor(message: string){
            super(message, 'ASDError')
        }
    }
}