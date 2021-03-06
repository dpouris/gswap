import type { Options, GallerySwap } from "../types";

const ANIMATIONS = {
  fade: [{ opacity: 1 }, { opacity: 0 }],
  fadeBack: [{ opacity: 0 }, { opacity: 1 }],

  slideRight: [
    { transform: "translate(0%)" },
    { transform: "translate(100%)" },
  ],

  slideLeft: [
    { transform: "translate(-100%)" },
    { transform: "translate(0%)" },
  ],
};
export default class GSwap implements GallerySwap {
  containerElem;
  images;
  options;
  #currentImg: number = 0;
  #nextNavBtn?: HTMLButtonElement;
  #backNavBtn?: HTMLButtonElement;
  #animation!: any[];

  constructor(
    containerElem: string | HTMLDivElement,
    images: string[],
    options: Options = {}
  ) {
    this.images = images;
    this.options = options;
    this.options.repeat =
      this.options.repeat === undefined ? true : this.options.repeat;

    if (typeof containerElem === "string") {
      let container = document.getElementById(containerElem as string);
      if (!container) {
        container = document.createElement("div");
        container.id = containerElem as string;
        document.body.appendChild(container);
      }
      this.containerElem = container as HTMLDivElement;
    } else {
      this.containerElem = containerElem;
    }

    this.options.imgDimensions = this.options.imgDimensions
      ? this.options.imgDimensions
      : { width: 300, height: 300 };

    this.options.direction =
      this.options.direction === undefined ? "left" : this.options.direction;

    this.options.animationDuration =
      this.options.animationDuration === undefined
        ? 300
        : this.options.animationDuration;

    this.options.navigation =
      this.options.navigation === undefined ? true : this.options.navigation;

    this.#animation =
      this.options.animation === undefined || this.options.animation === "fade"
        ? [ANIMATIONS.fade, ANIMATIONS.fadeBack]
        : this.options.animation === "slide"
        ? [ANIMATIONS.slideRight, ANIMATIONS.slideLeft]
        : [];

    this.#appendElementsOnMainContainer();

    this.stackImages();
  }

  #createImageContainerElement() {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("gallery-swap");
    imageContainer.style.height = this.options.imgDimensions!.height + "px";
    imageContainer.style.width = this.options.imgDimensions!.width + "px";
    imageContainer.style.position = "relative";

    // Place images inside div container
    const images = this.#createImageElements();
    images.forEach((image) => {
      imageContainer.appendChild(image);
    });

    return imageContainer;
  }

  #createImageElements() {
    return this.images.map((image) => {
      const imgElement = document.createElement("img");
      if (image === this.images[this.images.length - 1]) {
        imgElement.classList.add("active");
      }
      imgElement.src = image;
      imgElement.width = this.options.imgDimensions!.width;
      imgElement.height = this.options.imgDimensions!.height;
      imgElement.style.position = "absolute";
      imgElement.style.opacity = "1";
      imgElement.style.transition = `all ${this.options.animationDuration}ms ease-in-out`;
      // Optional image beautification
      if (!this.options.styled) return imgElement;
      imgElement.style.boxShadow = "rgb(0 0 0 / 30%) -6px 4px 6px 0px";
      imgElement.style.borderRadius = "0.2em";
      return imgElement;
    });
  }

  #createNavigation = () => {
    const nav = document.createElement("nav");
    nav.classList.add("gallery-swap-nav");
    nav.style.display = "flex";
    nav.style.justifyContent = "center";
    nav.style.alignItems = "center";
    nav.style.gap = "3rem";
    // Todo (if this.options.verticalBtns is true) add class flexDirection = column and remove gap = 3

    const navLeftBtn = document.createElement("button");
    navLeftBtn.onclick = this.prev;
    navLeftBtn.innerHTML = "&larr;";
    navLeftBtn.classList.add("gallery-swap-nav-left");
    navLeftBtn.style.fontSize = "2rem";
    // If option repeat is false then at the start the back button is disabled
    if (!this.options.repeat) {
      navLeftBtn.disabled = true;
      navLeftBtn.style.filter = "opacity(0.5)";
    }

    const navRightBtn = document.createElement("button");
    navRightBtn.onclick = this.next;
    navRightBtn.innerHTML = "&rarr;";
    navRightBtn.classList.add("gallery-swap-nav-right");
    navRightBtn.style.fontSize = "2rem";

    if (this.options.navigation === "forwardOnly") {
      nav.appendChild(navRightBtn);
      return nav;
    }
    if (this.options.navigation === "backOnly") {
      nav.appendChild(navLeftBtn);
      return nav;
    }

    nav.appendChild(navLeftBtn);
    nav.appendChild(navRightBtn);

    this.#nextNavBtn = navRightBtn;
    this.#backNavBtn = navLeftBtn;

    return nav;
  };

  #appendElementsOnMainContainer() {
    this.containerElem.innerHTML = "";
    this.containerElem.appendChild(this.#createImageContainerElement());

    if (this.options.navigation) {
      this.containerElem.appendChild(this.#createNavigation());
    }
  }

  #shiftImagesToTheRight = () => {
    const last = this.containerElem.children[0]
      .lastElementChild! as HTMLImageElement;

    if (this.#animation.length > 0) {
      last.animate(this.#animation[0], {
        duration: this.options.animationDuration || 300,
      });
    }

    setTimeout(() => {
      this.containerElem.children[0].prepend(last);
      if (this.#currentImg < this.images.length) this.#currentImg++;
      last.style.opacity = "1";
      this.stackImages();
      this.#findActiveElem();
    }, this.options.animationDuration || 300);
  };

  #shiftImagesToTheLeft = () => {
    const first = this.containerElem.children[0]
      .firstElementChild! as HTMLImageElement;

    if (this.#animation.length > 0) {
      first.animate(this.#animation[1], {
        duration: this.options.animationDuration || 300,
      });
    }

    // setTimeout(() => {}, this.options.animationDuration || 300);
    this.containerElem.children[0].append(first);
    if (this.#currentImg > 0) this.#currentImg--;
    first.style.opacity = "1";
    this.stackImages();
    this.#findActiveElem();
  };

  #findActiveElem = () => {
    this.containerElem.children[0].childNodes.forEach((image) => {
      const imgElem = image as HTMLImageElement;
      if (imgElem.classList.contains("active")) {
        imgElem.classList.remove("active");
      }
    });
    const activeElem = this.containerElem.children[0]
      .lastElementChild! as HTMLElement;

    activeElem.classList.add("active");
  };

  stackImages = () => {
    let directionLeft: number;
    let directionTop: number;

    switch (this.options.direction) {
      case "left":
        directionLeft = 20;
        directionTop = 20;
        break;
      case "right":
        directionLeft = -20;
        directionTop = 20;
        break;
      case "top":
        directionLeft = 0;
        directionTop = 20;
        break;
      case "bottom":
        directionLeft = 0;
        directionTop = -20;
        break;
    }
    let counter = 0;
    this.containerElem.children[0].childNodes.forEach((image) => {
      const imgElem = image as HTMLImageElement;
      imgElem.style.top = (counter * directionTop).toString() + "px";
      imgElem.style.left = (counter * directionLeft).toString() + "px";
      counter++;
    });
  };

  next = () => {
    this.#shiftImagesToTheRight();

    if (
      this.#currentImg === this.images.length - 1 &&
      this.options.repeat === false
    ) {
      this.#backNavBtn!.disabled = false;
      this.#backNavBtn!.style.filter = "opacity(1)";
      this.#nextNavBtn!.disabled = true;
      this.#nextNavBtn!.style.filter = "opacity(0.5)";
    }
  };

  prev = () => {
    this.#shiftImagesToTheLeft();

    if (this.#currentImg === 0 && this.options.repeat === false) {
      this.#nextNavBtn!.disabled = false;
      this.#nextNavBtn!.style.filter = "opacity(1)";
      this.#backNavBtn!.disabled = true;
      this.#backNavBtn!.style.filter = "opacity(0.5)";
    }
  };

  goTo = (index: number) => {
    if (index >= this.images.length) {
      throw new Error("Index out of bounds");
    }

    if (index < 0) {
      throw new Error("Index out of bounds");
    }

    if (index === this.#currentImg) {
      return;
    }

    if (index > this.#currentImg) {
      for (let i = 0; i <= index - this.#currentImg; i++) {
        this.next();
        this.#currentImg++;
      }
      return;
    }
    for (let i = 0; i <= this.#currentImg - index; i++) {
      this.prev();
      this.#currentImg--;
    }
  };
}
