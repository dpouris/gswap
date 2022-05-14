export interface GallerySwap {
  container: HTMLDivElement;
}

export type Options = {
  animation?: string;
  animationDuration?: number;
  navigation?: boolean | "forwardOnly" | "backOnly";
  repeat?: boolean;
  direction?: "left" | "right" | "top" | "bottom";
  imgDimensions?: {
    height: number;
    width: number;
  };
};
