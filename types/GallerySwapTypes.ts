export interface GallerySwap {
  containerElem: HTMLDivElement;
  images: string[];
  options: Options;
  stackImages(): void;
  stackImages: () => void;
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
}

export type Options = {
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
