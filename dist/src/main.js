!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["@dpouris/gswap"]=e():t["@dpouris/gswap"]=e()}(self,(()=>(()=>{"use strict";var t={917:(t,e,i)=>{i.r(e),i.d(e,{default:()=>r});var n=i(532),s=i.n(n),o=i(329),a=i.n(o)()(s());a.push([t.id,"@keyframes fade {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes slide {\n  0% {\n    transform: translateX(100%);\n  }\n  100% {\n    transform: translateX(0%);\n  }\n}\n\n.active {\n  animation: fade 0.5s linear;\n}\n",""]);const r=a},329:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i="",n=void 0!==e[5];return e[4]&&(i+="@supports (".concat(e[4],") {")),e[2]&&(i+="@media ".concat(e[2]," {")),n&&(i+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),i+=t(e),n&&(i+="}"),e[2]&&(i+="}"),e[4]&&(i+="}"),i})).join("")},e.i=function(t,i,n,s,o){"string"==typeof t&&(t=[[null,t,void 0]]);var a={};if(n)for(var r=0;r<this.length;r++){var l=this[r][0];null!=l&&(a[l]=!0)}for(var h=0;h<t.length;h++){var c=[].concat(t[h]);n&&a[c[0]]||(void 0!==o&&(void 0===c[5]||(c[1]="@layer".concat(c[5].length>0?" ".concat(c[5]):""," {").concat(c[1],"}")),c[5]=o),i&&(c[2]?(c[1]="@media ".concat(c[2]," {").concat(c[1],"}"),c[2]=i):c[2]=i),s&&(c[4]?(c[1]="@supports (".concat(c[4],") {").concat(c[1],"}"),c[4]=s):c[4]="".concat(s)),e.push(c))}},e}},532:t=>{t.exports=function(t){return t[1]}},118:function(t,e,i){var n,s,o,a,r,l,h,c,d,p,f,m=this&&this.__classPrivateFieldGet||function(t,e,i,n){if("a"===i&&!n)throw new TypeError("Private accessor was defined without a getter");if("function"==typeof e?t!==e||!n:!e.has(t))throw new TypeError("Cannot read private member from an object whose class did not declare it");return"m"===i?n:"a"===i?n.call(t):n?n.value:e.get(t)},u=this&&this.__classPrivateFieldSet||function(t,e,i,n,s){if("m"===n)throw new TypeError("Private method is not writable");if("a"===n&&!s)throw new TypeError("Private accessor was defined without a setter");if("function"==typeof e?t!==e||!s:!e.has(t))throw new TypeError("Cannot write private member to an object whose class did not declare it");return"a"===n?s.call(t,i):s?s.value=i:e.set(t,i),i};Object.defineProperty(e,"__esModule",{value:!0}),i(917),e.default=class{constructor(t,e,i={}){if(n.add(this),s.set(this,0),o.set(this,void 0),a.set(this,void 0),h.set(this,(()=>{const t=document.createElement("nav");t.classList.add("gallery-swap-nav"),t.style.display="flex",t.style.justifyContent="center",t.style.alignItems="center",t.style.gap="3rem";const e=document.createElement("button");e.onclick=this.prev,e.innerHTML="&larr;",e.classList.add("gallery-swap-nav-left"),e.style.fontSize="2rem",this.options.repeat||(e.disabled=!0,e.style.filter="opacity(0.5)");const i=document.createElement("button");return i.onclick=this.next,i.innerHTML="&rarr;",i.classList.add("gallery-swap-nav-right"),i.style.fontSize="2rem","forwardOnly"===this.options.navigation?(t.appendChild(i),t):"backOnly"===this.options.navigation?(t.appendChild(e),t):(t.appendChild(e),t.appendChild(i),u(this,o,i,"f"),u(this,a,e,"f"),t)})),d.set(this,(()=>{const t=this.containerElem.children[0].lastElementChild;t.style.opacity="0",t.ontransitionend=()=>{var e;this.containerElem.children[0].prepend(t),m(this,s,"f")<this.images.length&&u(this,s,(e=m(this,s,"f"),++e),"f"),t.ontransitionend=null,t.style.opacity="1",this.stackImages(),m(this,f,"f").call(this)}})),p.set(this,(()=>{const t=this.containerElem.children[0].firstElementChild;t.style.opacity="0",t.ontransitionend=()=>{var e;this.containerElem.children[0].append(t),m(this,s,"f")>0&&u(this,s,(e=m(this,s,"f"),--e),"f"),t.ontransitionend=null,t.style.opacity="1",this.stackImages(),m(this,f,"f").call(this)}})),f.set(this,(()=>{this.containerElem.children[0].childNodes.forEach((t=>{const e=t;e.classList.contains("active")&&e.classList.remove("active")})),this.containerElem.children[0].lastElementChild.classList.add("active")})),this.stackImages=()=>{let t,e;switch(this.options.direction){case"left":t=20,e=20;break;case"right":t=-20,e=20;break;case"top":t=0,e=20;break;case"bottom":t=0,e=-20}let i=0;this.containerElem.children[0].childNodes.forEach((n=>{const s=n;s.style.top=(i*e).toString()+"px",s.style.left=(i*t).toString()+"px",i++}))},this.next=()=>{m(this,d,"f").call(this),m(this,s,"f")===this.images.length-1&&!1===this.options.repeat&&(m(this,a,"f").disabled=!1,m(this,a,"f").style.filter="opacity(1)",m(this,o,"f").disabled=!0,m(this,o,"f").style.filter="opacity(0.5)")},this.prev=()=>{m(this,p,"f").call(this),0===m(this,s,"f")&&!1===this.options.repeat&&(m(this,o,"f").disabled=!1,m(this,o,"f").style.filter="opacity(1)",m(this,a,"f").disabled=!0,m(this,a,"f").style.filter="opacity(0.5)")},this.goTo=t=>{var e,i;if(t>=this.images.length)throw new Error("Index out of bounds");if(t<0)throw new Error("Index out of bounds");if(t!==m(this,s,"f"))if(t>m(this,s,"f"))for(let i=0;i<=t-m(this,s,"f");i++)this.next(),u(this,s,(e=m(this,s,"f"),++e),"f");else for(let e=0;e<=m(this,s,"f")-t;e++)this.prev(),u(this,s,(i=m(this,s,"f"),--i),"f")},this.images=e,this.options=i,this.options.repeat=void 0===this.options.repeat||this.options.repeat,"string"==typeof t){let e=document.getElementById(t);e||(e=document.createElement("div"),e.id=t,document.body.appendChild(e)),this.containerElem=e}else this.containerElem=t;this.options.imgDimensions=this.options.imgDimensions?this.options.imgDimensions:{width:300,height:300},this.options.direction=void 0===this.options.direction?"left":this.options.direction,this.options.animationDuration=void 0===this.options.animationDuration?300:this.options.animationDuration,this.options.navigation=void 0===this.options.navigation||this.options.navigation,m(this,n,"m",c).call(this),this.stackImages()}},s=new WeakMap,o=new WeakMap,a=new WeakMap,h=new WeakMap,d=new WeakMap,p=new WeakMap,f=new WeakMap,n=new WeakSet,r=function(){const t=document.createElement("div");return t.classList.add("gallery-swap"),t.style.height=this.options.imgDimensions.height+"px",t.style.width=this.options.imgDimensions.width+"px",t.style.position="relative",m(this,n,"m",l).call(this).forEach((e=>{t.appendChild(e)})),t},l=function(){return this.images.map((t=>{const e=document.createElement("img");return t===this.images[this.images.length-1]&&e.classList.add("active"),e.src=t,e.width=this.options.imgDimensions.width,e.height=this.options.imgDimensions.height,e.style.position="absolute",e.style.opacity="1",e.style.transition=`all ${this.options.animationDuration}ms ease-in-out`,this.options.styled?(e.style.boxShadow="rgb(0 0 0 / 30%) -6px 4px 6px 0px",e.style.borderRadius="0.2em",e):e}))},c=function(){this.containerElem.innerHTML="",this.containerElem.appendChild(m(this,n,"m",r).call(this)),this.options.navigation&&this.containerElem.appendChild(m(this,h,"f").call(this))}}},e={};function i(n){var s=e[n];if(void 0!==s)return s.exports;var o=e[n]={id:n,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.exports}return i.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return i.d(e,{a:e}),e},i.d=(t,e)=>{for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),i.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i(118)})()));