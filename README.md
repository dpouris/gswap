# GSwap 🌠

### Create a gallery of images with ease.

![img](./gswap.gif)

---

To get started, in your project folder, run:

```bash
npm i @dpouris/gswap
```

# Usage 🔨

First, import the library and create a new gswap instance:

```js
import { GSwap } from '@dpouris/gswap';

...

const galleryContainer = document.getElementById("gallery")

const gswap = new GSwap({
  containerElem: galleryContainer,

  images: ["./1.jpg", "./2.jpg", "./3.webp"],

  options : {
    //animation: "fade", -> Todo
    animationDuration: "300",
    navigation: true,
    // repeat: true, -> Todo
    imgDimensions: { height: 300, width: 300 },
  }
});
```

This will create a new instance of gswap and will place the gallery absolutely inside the container you specified.

- **containerElem** (_required_):
  - The container (div) element where the gallery will be placed absolutely.
- **images** (_required_):
  - An array of image paths.
- **options** (_optional_):
  - An object of options.
  - See the [options](#Options) section for more details.

# Options ⚙️

## **animation** (_fade_ | _slide_ | _none_) -> [wip]

    Takes in an animation eg. fade or slide and applies it to the switching motion of the images.

- **fade**:
  Fades the images in and out.
- **slide**:
  Slides the images in and out.
- **none**:
  Does not apply any animation.

- **Default**: fade

---

## **animationDuration** (_number_)

    Takes in the duration of the animation that occurs upon switching the images and the speed at which the images move, in milliseconds. # 1000 = 1 second.

- **Default**: 300

---

## **navigation** (_boolean_ | forwardOnly | backOnly)

    If true, the navigation arrows will be displayed. # true | false | "forwardOnly" | "backOnly"

- **forwardOnly**:
  Only the forward arrow will be displayed.
- **backOnly**:
  Only the back arrow will be displayed.

- **Default**: true

---

## **repeat** (_boolean_) -> [wip]

    If true, the gallery will loop infinitely. # true || false

    [wip]

- **Default**: true

## direction (_top_ | _bottom_ | _left_ | _right_)

    The direction of the gallery. # top || bottom

## imgDimensions (_object_ : {height : number, width: number})

    Takes in an object that contains the keys of width and height that will be applied as the dimensions of the images. # { height: 300, width: 300 }

    Default: { height: 300, width: 300 }

# Methods 🧑‍💻

- [**gswap.next()**](<#gswap.next()>)
- [**gswap.prev()**](<#gswap.next()>)
- [**gswap.goTo(index)**](<#gswap.goTo(index)>) -> [wip]
- [**gswap.stackImages()**](<#gswap.stackImages()>)

---

## **gswap.next()**

Displays the next image in the gallery.
You can call the **next()** method by calling it from the gallery instance like so.

```js
const gallery = new GSwap(...);

...

gallery.next();
```

OR

You can bind the **next()** method to an onclick event like so.

```js
const gallery = new GSwap(...);
const nextBtn = document.getElementById('nextGalleryBtn')

nextBtn.onclick = gallery.next;
```

**The same concept applies for the .prev() method the only difference being the it moves backwards through the images.**

## **gswap.goTo(index)** -> wip

Takes in an index and displays the image at that index.

[wip]

## **gswap.stackImages()**

Stacks the images in the gallery in case their position was altered.

Can be called from the gallery instance like so.

```js
const gallery = new GSwap(...);

...

gallery.stackImages();
```

Thank you for trying out my first library and I hope you enjoy it. 🫡
