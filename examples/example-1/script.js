import { GSwap } from "@dpouris/gswap";

const gallery = new GSwap(
  document.getElementById("gallery"),
  ["./1.jpg", "./2.jpg", "./3.webp"],
  {
    animation: "fade",
    animationDuration: "300",
    navigation: true,
    repeat: true,
    imgDimensions: { height: 300, width: 300 },
  }
);

// const stackBtn = document.createElement("button");
// const prevBtn = document.createElement("button");
// const nextBtn = document.createElement("button");

// stackBtn.onclick = gallery.stackImages;
// prevBtn.onclick = gallery.prev;
// nextBtn.onclick = gallery.next;

// // stackBtn.innerText = "Stack";
// prevBtn.innerText = "Prev";
// nextBtn.innerText = "Next";

// // document.body.appendChild(stackBtn);
// document.body.appendChild(prevBtn);
// document.body.appendChild(nextBtn);
