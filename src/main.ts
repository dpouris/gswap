import type { Options, GallerySwap } from "../@types/GallerySwapTypes";

export class GSwap implements GallerySwap {
  containerElem;
  images;
  options;
  #currentImg: number = 0;

  constructor(
    containerElem: string | HTMLDivElement,
    images: string[],
    options: Options = {}
  ) {
    this.images = images;
    this.options = options;

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

    this.#appendElementsOnMainContainer();

    this.stackImages();
  }

  #creatImageContainerElement() {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("gallery-swap");
    imageContainer.style.height = this.options.imgDimensions!.height + "px";
    imageContainer.style.width = this.options.imgDimensions!.width + "px";
    imageContainer.style.position = "relative";

    // imageContainer.style.transition = `all ${this.options.animationDuration} ${this.options.animation}`;
    // imageContainer.style.animation = this.options.animation;
    // imageContainer.style.animationDuration = this.options.animationDuration;

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
      imgElement.style.transition = `all ${this.options.animationDuration}ms ease-in-out`;

      // Optional image beautification
      if (this.options.styled) {
        imgElement.style.boxShadow = "rgb(0 0 0 / 30%) -6px 4px 6px 0px";
        imgElement.style.borderRadius = "0.2em";
      }
      return imgElement;
    });
  }

  #createNavigation = () => {
    const nav = document.createElement("nav");
    nav.classList.add("gallery-swap-nav");

    const navLeft = document.createElement("button");
    navLeft.onclick = this.prev;

    navLeft.innerHTML = "&larr;";
    navLeft.classList.add("gallery-swap-nav-left");

    const navRight = document.createElement("button");
    navRight.onclick = this.next;
    navRight.innerHTML = "&rarr;";
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

  #appendElementsOnMainContainer() {
    this.containerElem.innerHTML = "";
    this.containerElem.appendChild(this.#creatImageContainerElement());

    if (this.options.navigation) {
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
        imgElem.classList.remove("active");
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
      const imgElem = image as HTMLImageElement;
      imgElem.style.position = "absolute";
      imgElem.style.opacity = "1";
      imgElem.style.top = (counter * directionTop).toString() + "px";
      imgElem.style.left = (counter * directionLeft).toString() + "px";
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
