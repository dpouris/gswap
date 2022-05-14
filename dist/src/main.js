"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _GSwap_instances, _GSwap_currentImg, _GSwap_createGSwapElement, _GSwap_createImageElements, _GSwap_createNavigation, _GSwap_appendElementsOnContainer, _GSwap_shiftImagesToTheRight, _GSwap_shiftImagesToTheLeft, _GSwap_findPrevActiveElem, _GSwap_findNextActiveElement;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GSwap = void 0;
class GSwap {
    constructor(containerElem, images, options = {}) {
        _GSwap_instances.add(this);
        _GSwap_currentImg.set(this, 0);
        _GSwap_createNavigation.set(this, () => {
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
            // first.remove();
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
                image.style.position = "absolute";
                image.style.opacity = "1";
                image.style.top =
                    (counter * directionTop).toString() + "px";
                image.style.left =
                    (counter * directionLeft).toString() + "px";
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
        this.containerElem = containerElem;
        this.images = images;
        this.options = options;
        this.options.imgDimensions = this.options
            .imgDimensions.hasOwnProperty("height")
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
        __classPrivateFieldGet(this, _GSwap_instances, "m", _GSwap_appendElementsOnContainer).call(this);
        this.stackImages();
    }
}
exports.GSwap = GSwap;
_GSwap_currentImg = new WeakMap(), _GSwap_createNavigation = new WeakMap(), _GSwap_shiftImagesToTheRight = new WeakMap(), _GSwap_shiftImagesToTheLeft = new WeakMap(), _GSwap_findPrevActiveElem = new WeakMap(), _GSwap_findNextActiveElement = new WeakMap(), _GSwap_instances = new WeakSet(), _GSwap_createGSwapElement = function _GSwap_createGSwapElement() {
    const GSElement = document.createElement("div");
    GSElement.classList.add("gallery-swap");
    // GSElement.style.transition = `all ${this.options.animationDuration} ${this.options.animation}`;
    GSElement.style.height = this.options.imgDimensions.height * 2 + "px";
    GSElement.style.width = this.options.imgDimensions.width * 2 + "px";
    GSElement.style.position = "relative";
    // GSElement.style.animation = this.options.animation;
    // GSElement.style.animationDuration = this.options.animationDuration;
    // const imageContainer = document.createElement("div");
    // Place images inside div container
    const images = __classPrivateFieldGet(this, _GSwap_instances, "m", _GSwap_createImageElements).call(this);
    images.forEach((image) => {
        GSElement.appendChild(image);
    });
    return GSElement;
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
        return imgElement;
    });
}, _GSwap_appendElementsOnContainer = function _GSwap_appendElementsOnContainer() {
    this.containerElem.innerHTML = "";
    this.containerElem.appendChild(__classPrivateFieldGet(this, _GSwap_instances, "m", _GSwap_createGSwapElement).call(this));
    if (this.options.navigation === true) {
        this.containerElem.appendChild(__classPrivateFieldGet(this, _GSwap_createNavigation, "f").call(this));
    }
};
