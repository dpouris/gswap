import type { Options } from "../types/GallerySwapTypes";
export declare class GSwap {
    #private;
    containerElem: HTMLDivElement;
    images: string[];
    options: Options;
    constructor(containerElem: HTMLDivElement, images: string[], options?: Options);
    stackImages: () => void;
    next: () => void;
    prev: () => void;
}
