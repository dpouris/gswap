export interface GallerySwap {
    container: HTMLDivElement;
}
export declare type Options = {
    animation: string;
    animationDuration: string;
    navigation: boolean | "forwardOnly" | "backOnly";
    repeat?: boolean;
    direction?: "left" | "right" | "top" | "bottom";
    imgDimensions: {
        height: number;
        width: number;
    };
};
