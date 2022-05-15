export interface GallerySwap {
    containerElem: HTMLDivElement;
    images: string[];
    options: Options;
    stackImages(): void;
    stackImages: () => void;
    next: () => void;
    prev: () => void;
}
export declare type Options = {
    animation?: string;
    animationDuration?: number;
    navigation?: boolean | "forwardOnly" | "backOnly";
    repeat?: boolean;
    direction?: "left" | "right" | "top" | "bottom";
    styled?: boolean;
    imgDimensions?: {
        height: number;
        width: number;
    };
};
