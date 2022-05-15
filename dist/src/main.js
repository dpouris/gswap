"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _GSwap_instances, _GSwap_currentImg, _GSwap_creatImageContainerElement, _GSwap_createImageElements, _GSwap_createNavigation, _GSwap_appendElementsOnMainContainer, _GSwap_shiftImagesToTheRight, _GSwap_shiftImagesToTheLeft, _GSwap_findPrevActiveElem, _GSwap_findNextActiveElement;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GSwap = void 0;
class GSwap {
    constructor(containerElem, images, options = {}) {
        _GSwap_instances.add(this);
        _GSwap_currentImg.set(this, 0);
        _GSwap_createNavigation.set(this, () => {
            const nav = document.createElement("nav");
            nav.classList.add("gallery-swap-nav");
            const navLeftBtn = document.createElement("button");
            navLeftBtn.onclick = this.prev;
            navLeftBtn.innerHTML = "&larr;";
            navLeftBtn.classList.add("gallery-swap-nav-left");
            navLeftBtn.style.display = "flex";
            navLeftBtn.style.justifyContent = "center";
            navLeftBtn.style.alignItems = "center";
            navLeftBtn.style.fontSize = "2rem";
            const navRightBtn = document.createElement("button");
            navRightBtn.onclick = this.next;
            navRightBtn.innerHTML = "&rarr;";
            navRightBtn.classList.add("gallery-swap-nav-right");
            navRightBtn.style.display = "flex";
            navRightBtn.style.justifyContent = "center";
            navRightBtn.style.alignItems = "center";
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
            return nav;
        });
        _GSwap_shiftImagesToTheRight.set(this, () => {
            const last = this.containerElem.children[0].lastElementChild;
            this.containerElem.children[0].insertAdjacentHTML("afterbegin", last.outerHTML);
            last.remove();
        });
        _GSwap_shiftImagesToTheLeft.set(this, () => {
            const first = this.containerElem.children[0]
                .firstElementChild;
            this.containerElem.children[0].insertAdjacentHTML("beforeend", first.outerHTML);
            first.style.opacity = "0";
            first.remove();
        });
        _GSwap_findPrevActiveElem.set(this, () => {
            this.containerElem.children[0].childNodes.forEach((image) => {
                const imgElem = image;
                if (imgElem.classList.contains("active")) {
                    imgElem.classList.remove("active");
                }
            });
            const activeElem = this.containerElem.children[0]
                .lastElementChild;
            activeElem.style.opacity = "0";
            setTimeout(() => {
                activeElem.style.opacity = "1";
            }, this.options.animationDuration);
            activeElem.classList.add("active");
        });
        _GSwap_findNextActiveElement.set(this, () => {
            this.containerElem.children[0].childNodes.forEach((image) => {
                const imgElem = image;
                if (imgElem.classList.contains("active")) {
                    imgElem.classList.remove("active");
                    imgElem.style.opacity = "0";
                    setTimeout(() => {
                        imgElem.style.opacity = "1";
                    }, this.options.animationDuration);
                }
            });
            const activeElem = this.containerElem.children[0].lastElementChild;
            activeElem.classList.add("active");
        });
        this.stackImages = () => {
            let directionLeft;
            let directionTop;
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
                const imgElem = image;
                imgElem.style.position = "absolute";
                imgElem.style.opacity = "1";
                imgElem.style.top = (counter * directionTop).toString() + "px";
                imgElem.style.left = (counter * directionLeft).toString() + "px";
                counter++;
            });
        };
        this.next = () => {
            __classPrivateFieldGet(this, _GSwap_shiftImagesToTheRight, "f").call(this);
            this.stackImages();
            __classPrivateFieldGet(this, _GSwap_findNextActiveElement, "f").call(this);
        };
        this.prev = () => {
            __classPrivateFieldGet(this, _GSwap_shiftImagesToTheLeft, "f").call(this);
            this.stackImages();
            __classPrivateFieldGet(this, _GSwap_findPrevActiveElem, "f").call(this);
        };
        this.images = images;
        this.options = options;
        if (typeof containerElem === "string") {
            let container = document.getElementById(containerElem);
            if (!container) {
                container = document.createElement("div");
                container.id = containerElem;
                document.body.appendChild(container);
            }
            this.containerElem = container;
        }
        else {
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
        __classPrivateFieldGet(this, _GSwap_instances, "m", _GSwap_appendElementsOnMainContainer).call(this);
        this.stackImages();
    }
}
exports.GSwap = GSwap;
_GSwap_currentImg = new WeakMap(), _GSwap_createNavigation = new WeakMap(), _GSwap_shiftImagesToTheRight = new WeakMap(), _GSwap_shiftImagesToTheLeft = new WeakMap(), _GSwap_findPrevActiveElem = new WeakMap(), _GSwap_findNextActiveElement = new WeakMap(), _GSwap_instances = new WeakSet(), _GSwap_creatImageContainerElement = function _GSwap_creatImageContainerElement() {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("gallery-swap");
    imageContainer.style.height = this.options.imgDimensions.height + "px";
    imageContainer.style.width = this.options.imgDimensions.width + "px";
    imageContainer.style.position = "relative";
    // imageContainer.style.transition = `all ${this.options.animationDuration} ${this.options.animation}`;
    // imageContainer.style.animation = this.options.animation;
    // imageContainer.style.animationDuration = this.options.animationDuration;
    // Place images inside div container
    const images = __classPrivateFieldGet(this, _GSwap_instances, "m", _GSwap_createImageElements).call(this);
    images.forEach((image) => {
        imageContainer.appendChild(image);
    });
    return imageContainer;
}, _GSwap_createImageElements = function _GSwap_createImageElements() {
    return this.images.map((image) => {
        const imgElement = document.createElement("img");
        if (image === this.images[this.images.length - 1]) {
            imgElement.classList.add("active");
        }
        imgElement.src = image;
        imgElement.width = this.options.imgDimensions.width;
        imgElement.height = this.options.imgDimensions.height;
        imgElement.style.transition = `all ${this.options.animationDuration}ms ease-in-out`;
        // Optional image beautification
        if (this.options.styled) {
            imgElement.style.boxShadow = "rgb(0 0 0 / 30%) -6px 4px 6px 0px";
            imgElement.style.borderRadius = "0.2em";
        }
        return imgElement;
    });
}, _GSwap_appendElementsOnMainContainer = function _GSwap_appendElementsOnMainContainer() {
    this.containerElem.innerHTML = "";
    this.containerElem.appendChild(__classPrivateFieldGet(this, _GSwap_instances, "m", _GSwap_creatImageContainerElement).call(this));
    if (this.options.navigation) {
        this.containerElem.appendChild(__classPrivateFieldGet(this, _GSwap_createNavigation, "f").call(this));
    }
};
//# sourceMappingURL=main.js.map