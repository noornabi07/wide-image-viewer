(()=>{"use strict";var t={338:(t,e,r)=>{var a=r(795);e.H=a.createRoot,a.hydrateRoot},795:t=>{t.exports=window.ReactDOM}},e={};const r=window.React;var a=function r(a){var n=e[a];if(void 0!==n)return n.exports;var o=e[a]={exports:{}};return t[a](o,o.exports,r),o.exports}(338);const n=t=>{const{color:e="#333",bgType:r="solid",bg:a="#0000",gradient:n="linear-gradient(135deg, #4527a4, #8344c5)"}=t||{};return`\n\t\t${e?`color: ${e};`:""}\n\t\t${n||a?`background: ${"gradient"===r?n:a};`:""}\n\t`},o=({attributes:t,id:e})=>{const{colors:a,paver:o}=t;console.log(o);const i=`#${e} .bBlocksTestPurpose`,s=`${i} .panorama`;return(0,r.createElement)("style",{dangerouslySetInnerHTML:{__html:`\n\t\t\n\t\t${i} p{\n\t\t\t${n(a)}\n\t\t}\n\t\t${s}{\n\t\t\theight: ${o.height.desktop};\n\t\t}\n\t`}})},i=({attributes:t,device:e})=>{const{paver:a,align:n}=t,{strtPosition:o,position:i,failedMsg:s,isFailedMsg:l}=a,c=(0,r.useRef)(null);return(0,r.useEffect)((()=>{const t=window.jQuery(c.current),e={failureMessage:s,failureMessageInsert:i,gracefulFailure:l,meta:!1,responsive:!0,startPosition:o,minimumOverflow:200,grain:3,cursorThrottle:1e3/60,gyroscopeThrottle:1e3/60,panningThrottle:125,resizeThrottle:500,mouseSmoothingFunction:"linear",tilt:!0,tiltSensitivity:.1,tiltScrollerPersistence:500,tiltSmoothingFunction:"gaussian",tiltThresholdPortrait:12,tiltThresholdLandscape:24};return t.paver(e),()=>{t.data("paver")&&t.paver("destroy")}}),[a.imgUrl,a.height[e],n]),(0,r.createElement)("div",{"data-paver":!0,className:"panorama paver--initialized paver--ready paver--off",ref:c,key:a.imgUrl},(0,r.createElement)("img",{src:a?.imgUrl,alt:"Panorama"}))},s=({attributes:t})=>(0,r.createElement)("div",{className:"bBlocksTestPurpose"},(0,r.createElement)(i,{attributes:t}));document.addEventListener("DOMContentLoaded",(()=>{document.querySelectorAll(".wp-block-b-blocks-wide-image-viewer").forEach((t=>{const e=JSON.parse(t.dataset.attributes);(0,a.H)(t).render((0,r.createElement)(r.Fragment,null,(0,r.createElement)(o,{attributes:e,id:t.id}),(0,r.createElement)(s,{attributes:e}))),t?.removeAttribute("data-attributes")}))}))})();