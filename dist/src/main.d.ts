import type { Options, GallerySwap } from "../types";
export default class GSwap implements GallerySwap {
    #private;
    containerElem: HTMLDivElement;
    images: string[];
    options: Options;
    constructor(containerElem: string | HTMLDivElement, images: string[], options?: Options);
    stackImages: () => void;
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
}
