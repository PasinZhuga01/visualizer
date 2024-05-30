/// <reference path="types.ts" />

/// <reference path="event_target.ts" />

/// <reference path="geometry.ts" />
/// <reference path="vector.ts" />
/// <reference path="bounds.ts" />

namespace StructVisorAPI.Utils{
    export function randomBoolean(): boolean{
        return Boolean(randomInteger(0, 1));
    }

    export function randomInteger(min: number, max: number): number{
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    export function randomFloat(min: number, max: number): number {
        return min + Math.random() * (max - min + Number.EPSILON);
    }
    
    export function round(number: number, digits: number = 0): number{
        return Number(number.toFixed(digits));
    }

    export function clamp(number: number, range: [number, number]): number{
        if (number <= range[0]){
            return range[0];
        }
        if (number >= range[1]){
            return range[1];
        }

        return number;
    }

    export function toRadians(angle: number): number{
        return (Math.PI / 180) * angle;
    }

    export function checkCollide(Apos: number, Asize: number, Bpos: number, Bsize: number): boolean{
        return (Apos < Bpos + Bsize) && (Bpos < Apos + Asize);
    }

    export function includesWithIgnoreCase(string: string, substring: string): boolean{
        return string.toLowerCase().includes(substring.toLowerCase());
    }

    export function asyncSleep(milliseconds: number): Promise<unknown>{
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    export function startGenerator(generator: Generator, callback?: () => void){
        while (!generator.next().done){
            if (callback !== undefined){
                callback();
            }
        }
    }
}