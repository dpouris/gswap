import type { Options } from "../types/GallerySwapTypes";

export class GSwap {
  containerElem: HTMLDivElement;
  images: string[];
  options: Options;

  #currentImg: number = 0;

  constructor(
    containerElem: HTMLDivElement,
    images: string[],
    options: Options
  ) {
    this.containerElem = containerElem;
    this.images = images;
    this.options = options;

    this.options.imgDimensions = this.options
      .imgDimensions!.hasOwnProperty("height")
      .hasOwnProperty("width")
      ? this.options.imgDimensions
      : { width: 300, height: 300 };
    this.options.direction = this.options.direction;
    this.options.animationDuration =
      this.options.animationDuration === undefined
        ? 300
        : this.options.animationDuration;
    this.options.direction =
      this.options.direction === undefined ? "left" : this.options.direction;
    this.options.navigation =
      this.options.navigation === undefined ? true : this.options.navigation;

    this.#appendElementsOnContainer();

    this.stackImages();
  }

  #createGSwapElement() {
    const GSElement = document.createElement("div");
    GSElement.classList.add("gallery-swap");
    // GSElement.style.transition = `all ${this.options.animationDuration} ${this.options.animation}`;
    GSElement.style.height = this.options.imgDimensions!.height * 2 + "px";
    GSElement.style.width = this.options.imgDimensions!.width * 2 + "px";
    GSElement.style.position = "relative";
    // GSElement.style.animation = this.options.animation;
    // GSElement.style.animationDuration = this.options.animationDuration;

    // const imageContainer = document.createElement("div");

    // Place images inside div container
    const images = this.#createImageElements();
    images.forEach((image) => {
      GSElement.appendChild(image);
    });
    return GSElement;
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
      imgElement.style.transition = `all ${this.options.animationDuration}ms ease-out`;
      return imgElement;
    });
  }

  #createNavigation = () => {
    const nav = document.createElement("nav");
    nav.classList.add("gallery-swap-nav");

    const navLeft = document.createElement("button");
    navLeft.onclick = this.prev;

    navLeft.innerHTML = "&rarr;";
    navLeft.classList.add("gallery-swap-nav-left");

    const navRight = document.createElement("button");
    navRight.onclick = this.next;
    navRight.innerHTML = "&larr;";
    navRight.classList.add("gallery-swap-nav-right");

    if (this.options.navigation === "forwardOnly") {
      nav.appendChild(navRight);
      return nav;
    }
    if (this.options.navigation === "backOnly") {
      nav.appendChild(navLeft);
      return nav;
    }

    nav.appendChild(navLeft);
    nav.appendChild(navRight);

    return nav;
  };

  #appendElementsOnContainer() {
    this.containerElem.innerHTML = "";
    this.containerElem.appendChild(this.#createGSwapElement());
    if (this.options.navigation === true) {
      this.containerElem.appendChild(this.#createNavigation());
    }
  }

  #shiftImagesToTheRight = () => {
    const last = this.containerElem.children[0].lastElementChild!;

    this.containerElem.children[0].insertAdjacentHTML(
      "afterbegin",
      last.outerHTML
    );

    last.remove();
  };
  #shiftImagesToTheLeft = () => {
    const first = this.containerElem.children[0]
      .firstElementChild! as HTMLImageElement;
    this.containerElem.children[0].insertAdjacentHTML(
      "beforeend",
      first.outerHTML
    );
    first.style.opacity = "0";

    first.remove();

    // first.remove();
  };

  #findPrevActiveElem = () => {
    this.containerElem.children[0].childNodes.forEach((image) => {
      const imgElem = image as HTMLImageElement;
      if (imgElem.classList.contains("active")) {
        imgElem.classList.remove("active");
      }
    });
    const activeElem = this.containerElem.children[0]
      .lastElementChild! as HTMLElement;

    activeElem.style.opacity = "0";
    setTimeout(() => {
      activeElem.style.opacity = "1";
    }, this.options.animationDuration);

    activeElem.classList.add("active");
  };

  #findNextActiveElement = () => {
    this.containerElem.children[0].childNodes.forEach((image) => {
      const imgElem = image as HTMLImageElement;
      if (imgElem.classList.contains("active")) {
        (imgElem as HTMLImageElement).classList.remove("active");
        imgElem.style.opacity = "0";
        setTimeout(() => {
          imgElem.style.opacity = "1";
        }, this.options.animationDuration);
      }
    });
    const activeElem = this.containerElem.children[0].lastElementChild!;

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
      (image as HTMLImageElement).style.position = "absolute";
      (image as HTMLImageElement).style.opacity = "1";
      (image as HTMLImageElement).style.top =
        (counter * directionTop).toString() + "px";
      (image as HTMLImageElement).style.left =
        (counter * directionLeft).toString() + "px";
      counter++;
    });
  };

  next = () => {
    this.#shiftImagesToTheRight();
    this.stackImages();
    this.#findNextActiveElement();
  };

  prev = () => {
    this.#shiftImagesToTheLeft();
    this.stackImages();
    this.#findPrevActiveElem();
  };
}
