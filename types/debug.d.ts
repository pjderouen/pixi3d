import { EventEmitter } from "pixi.js";
import { Message } from "./message";
export declare namespace Debug {
    function on(event: string | symbol, fn: EventEmitter.ListenerFn, context: any): void;
    function warn(message: Message, args?: any): void;
    function error(message: Message, args?: any): void;
}
