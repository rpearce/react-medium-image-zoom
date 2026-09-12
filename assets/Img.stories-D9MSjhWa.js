import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{f as n}from"./iframe-DM3fsGZy.js";import{n as r,r as i}from"./styles-SahlJq2q.js";import{n as a,t as o}from"./uncontrolled-BRE9UnUC.js";import"./base-2zBuyiUy.js";import{f as s,h as c,i as l,l as u,m as d,n as f,o as p,p as m,s as h,t as g}from"./images-7UAUW_y0.js";function _(e){let t=structuredClone(e);for(let e=t.length-1;e>0;--e){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function v({alt:e,src:t,zoomProps:n}){let[r,i]=y.useState(!1),a=y.useCallback(()=>{i(e=>!e)},[]),s=y.useCallback(e=>{e.stopPropagation()},[]),c=y.useCallback(e=>{i(e.currentTarget.checked)},[]),l=y.useCallback((e,{event:t})=>{t.stopPropagation(),console.log(`handleZoomChange (after event.stopPropagation())`,{value:e,event:t})},[]);return y.createElement(`li`,{className:`card`,onClick:a},y.createElement(`label`,null,y.createElement(`input`,{"aria-label":`Select item`,checked:r,onChange:c,onClick:s,type:`checkbox`})),y.createElement(o,{...n,onZoomChange:l,wrapElement:`span`},y.createElement(`img`,{alt:e,src:t,height:`320`,width:`320`,decoding:`async`,loading:`lazy`})))}var y,b,x,S,C,w,T,E,D,O,k,A,j,M,N,P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q;function $(){return($=t((()=>{y=e(n(),1),a(),i(),c(),{waitFor:b,within:x,userEvent:S,expect:C}=__STORYBOOK_MODULE_TEST__,w={title:`<img>`,component:o},T=e=>{let t=y.useCallback((e,{event:t})=>{console.log(`handleZoomChange info!`,{value:e,event:t})},[]);return y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Zooming a regular image`),y.createElement(`div`,{className:`mw-600`,style:{display:`flex`,flexDirection:`column`}},y.createElement(o,{...e,onZoomChange:t,wrapElement:`span`},y.createElement(`img`,{alt:d.alt,src:d.src,height:`320`,decoding:`async`,loading:`lazy`}))))},E=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Setting a zoomMargin of 45(px)`),y.createElement(`div`,{className:`mw-600`},y.createElement(`p`,null,`This example should always be offset from the window by at least 45px`),y.createElement(o,{...e,zoomMargin:45},y.createElement(`img`,{alt:d.alt,src:d.src,height:`320`,decoding:`async`,loading:`lazy`})))),D=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`A portrait image with a small width specified`),y.createElement(`div`,{className:`mw-600`},y.createElement(`p`,null,`Small size specifications scale well, too — even on mobile.`),y.createElement(o,e,y.createElement(`img`,{alt:s.alt,src:s.src,height:`112`,decoding:`async`,loading:`lazy`})))),O=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`An image with an SVG src`),y.createElement(`div`,{className:`mw-600`},y.createElement(o,e,y.createElement(`img`,{alt:u.alt,src:u.src,width:`150`,decoding:`async`,loading:`lazy`})))),k=()=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`An image with a `,y.createElement(`code`,null,`data:image/svg+xml`),` `,y.createElement(`code`,null,`src`)),y.createElement(`div`,{className:`data-uri-img mw-600`},y.createElement(o,null,y.createElement(`img`,{alt:`Gatsby G Logo`,src:`data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E`})))),A=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`An image with a larger `,y.createElement(`code`,null,`zoomImg`)),y.createElement(`div`,{className:`mw-600`},y.createElement(`p`,null,`When zoomed, the original image will scale to as large as the window will allow, and then it will be replaced by an image that is downloaded in the background.`),y.createElement(o,{...e,zoomImg:{alt:p.alt,src:p.src}},y.createElement(`img`,{alt:h.alt,src:h.src,width:`150`})))),j=({img:e,isZoomImgLoaded:t,modalState:n})=>{let[r,i]=y.useState(!1);y.useEffect(()=>{if(n!==`LOADING`||!t)return;let e=setTimeout(()=>{i(!0)},1e3);return()=>{clearTimeout(e),i(!1)}},[t,n]);let a=n===`LOADING`&&!r;return y.createElement(y.Fragment,null,e,a&&y.createElement(`div`,{className:`zoom-img-loader-wrapper`},y.createElement(`div`,{className:`zoom-img-loader`})))},M=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`ZoomImg with Loading State`),y.createElement(`div`,{className:`mw-600`},y.createElement(`p`,null,`This example shows how to provide loading feedback when using a high-resolution `,y.createElement(`code`,null,`zoomImg`),`. The `,y.createElement(`code`,null,`ZoomContent`),` `,`component uses the `,y.createElement(`code`,null,`isZoomImgLoaded`),` prop to display a loading spinner while the high-resolution image is being downloaded.`),y.createElement(`p`,null,`Here the loading spinner is shown on every zoom, but in a real-world case, the browser caches the image, so you'll only see the loader at first load.`),y.createElement(o,{...e,zoomImg:{alt:p.alt,src:p.src},ZoomContent:j},y.createElement(`img`,{alt:h.alt,src:h.src,width:`150`})),y.createElement(`h2`,null,`Code`),y.createElement(`pre`,null,y.createElement(`code`,null,`
const CustomZoomContent: UncontrolledProps['ZoomContent'] = ({
  img,
  isZoomImgLoaded,
}) => {
  return (
    <>
      {img}
      {!isZoomImgLoaded && (
        <div className='loader-wrapper'>
          <div className='loader' />
        </div>
      )}
    </>
  )
}

<Zoom
  zoomImg={{
    src: 'higher-res-image.jpg',
  }}
  ZoomContent={CustomZoomContent}
>
  <img src='low-res-image.jpg' width="150" />
</Zoom>
          `)))),N=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`An image with a small size`),y.createElement(`div`,{className:`mw-600`},y.createElement(`p`,null,`In order to prevent blurry images, An image won't scale up larger than its natural dimensions.`),y.createElement(o,e,y.createElement(`img`,{alt:h.alt,src:h.src,width:`150`})))),P=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Custom Modal Styles`),y.createElement(`div`,{className:`mw-600`},y.createElement(`p`,null,`Use CSS to customize the zoom modal styles.`),y.createElement(`p`,null,`Here, we slow down the transition time and use a different overlay color.`),y.createElement(`div`,null,y.createElement(o,{...e,classDialog:`custom-zoom`},y.createElement(`img`,{alt:f.alt,src:f.src,width:`400`}))),y.createElement(`p`,null,`The CSS class, `,y.createElement(`code`,null,`custom-zoom`),`, is sent to the component via the `,y.createElement(`code`,null,`classDialog`),` string prop. Here are the styles used:`),y.createElement(`pre`,null,y.createElement(`code`,null,`
.custom-zoom [data-rmiz-modal-overlay],
.custom-zoom [data-rmiz-modal-img] {
  transition-duration: 0.8s;
  transition-timing-function: linear;
}
.custom-zoom [data-rmiz-modal-overlay="hidden"] {
  background-color: rgb(56, 58, 89, 0);
}
.custom-zoom [data-rmiz-modal-overlay="visible"] {
  background-color: rgb(56, 58, 89, 1);
}
.custom-zoom [data-rmiz-btn-unzoom] {
  background-color: #bd93f9;
  color: #000;
}
.custom-zoom [data-rmiz-btn-unzoom]:focus-visible {
  outline-offset: 0.4rem;
  outline: 0.2rem solid #bd93f9;
}
`)))),F=e=>{let t=y.useRef(null),n=y.useRef(null),r=y.useCallback(()=>{n.current?.showModal()},[]);return y.useEffect(()=>{let e=e=>{let{target:r}=e;r instanceof Element&&t.current?.contains(r)!==!0&&n.current?.contains(r)!==!0&&n.current?.close()};return document.addEventListener(`click`,e),()=>{document.removeEventListener(`click`,e)}},[]),y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Zoom Image From Inside Dialog`),y.createElement(`div`,{className:`mw-600`},y.createElement(`button`,{onClick:r,ref:t,type:`button`},`Open Modal`),y.createElement(`dialog`,{"aria-modal":`true`,ref:n},y.createElement(`form`,{method:`dialog`},y.createElement(`button`,{type:`submit`},`Close`)),y.createElement(`h1`,null,`Zooming should work!`),y.createElement(`div`,null,y.createElement(o,e,y.createElement(`img`,{alt:f.alt,src:f.src,width:`400`}))))))},I=e=>{let[t,n]=y.useState(!1),i=y.useCallback(e=>{n(e)},[]);return y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Modal With Figure And Caption`),y.createElement(`p`,null,`If you want more control over the zoom modal's content, you can pass a `,y.createElement(`code`,null,`ZoomContent`),` component.`),y.createElement(`h2`,null,`Uncontrolled`),y.createElement(`div`,{className:`mw-600`},y.createElement(o,{...e,ZoomContent:L},y.createElement(`img`,{alt:d.alt,src:d.src,height:`320`,decoding:`async`,loading:`lazy`}))),y.createElement(`h2`,null,`Controlled`),y.createElement(`p`,null,`Regression for`,` `,y.createElement(`a`,{href:`https://github.com/rpearce/react-medium-image-zoom/issues/448`},`issue #448`),`: when the parent owns `,y.createElement(`code`,null,`isZoomed`),` and passes`,` `,y.createElement(`code`,null,`ZoomContent`),` as an inline arrow function, its identity changes on every parent render, causing the modal subtree to remount. Zoom and unzoom should both animate smoothly.`),y.createElement(`div`,{className:`mw-600`},y.createElement(r,{isZoomed:t,onZoomChange:i,ZoomContent:e=>y.createElement(L,e)},y.createElement(`img`,{alt:d.alt,src:d.src,height:`320`,decoding:`async`,loading:`lazy`}))))},L=({buttonUnzoom:e,modalState:t,img:n})=>{let r=t===`LOADED`,i=y.isValidElement(n)?n:null,a=i?.props.width,o=i?.props.height,s=y.useMemo(()=>{let e=a!==void 0&&o!==void 0,t=e?a/o>window.innerWidth/window.innerHeight:!1;return Y({"zoom-caption":!0,"zoom-caption--loaded":r,"zoom-caption--bottom":e&&t,"zoom-caption--left":e&&!t})},[a,o,r]);return y.createElement(y.Fragment,null,e,y.createElement(`figure`,null,n,y.createElement(`figcaption`,{className:s},`That Wanaka Tree, also known as the Wanaka Willow, is a willow tree located at the southern end of Lake Wānaka in the Otago region of New Zealand.`,y.createElement(`cite`,{className:`zoom-caption-cite`},`Wikipedia,`,` `,y.createElement(`a`,{className:`zoom-caption-link`,href:`https://en.wikipedia.org/wiki/That_Wanaka_Tree`},`That Wanaka Tree`)))))},R=e=>{let{alt:t,height:n,src:r,timer:i,width:a}=e,o=i===0?{opacity:0,visibility:`hidden`,position:`absolute`}:{opacity:1};return y.useEffect(()=>{let e=new Image;e.src=r,e.decode()},[r]),y.createElement(`div`,null,y.createElement(`img`,{alt:``,"aria-hidden":`true`,decoding:`async`,height:n,src:`data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgQA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgED/9oADAMBAAIQAxAAAAFutLOHXan/xAAaEAACAwEBAAAAAAAAAAAAAAAAEwIDEQES/9oACAEBAAEFAmyxnT3YKhiqxcD/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQISUf/aAAgBAwEBPwFKjNdP/8QAFxEBAAMAAAAAAAAAAAAAAAAAAAERIf/aAAgBAgEBPwHFw//EABcQAQEBAQAAAAAAAAAAAAAAAAAxATL/2gAIAQEABj8Cq6qOUf/EAB0QAQACAgIDAAAAAAAAAAAAAAEAETFBIVFhcYH/2gAIAQEAAT8hLTa9xQK5/MRwq9wB94FrKsV+z//aAAwDAQACAAMAAAAQg+//xAAYEQACAwAAAAAAAAAAAAAAAAAAARFB0f/aAAgBAwEBPxBCxzaP/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAx/9oACAECAQE/EEUAZf/EAB0QAAICAgMBAAAAAAAAAAAAAAERADEhQVGRocH/2gAIAQEAAT8QrTbZUQmHR1CiO0TexMDR5OfZSZbuE1IcAh9n/9k=`,style:o,width:a}),i===0&&y.createElement(`img`,{alt:t,decoding:`async`,loading:`lazy`,src:r,width:a}))},z=e=>{let{timer:t}=Z(5e3);return y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`A sub-component which delays rendering`),y.createElement(`div`,{className:`mw-600`},y.createElement(`p`,null,`This examples simulates an issue caused by the gatsby-plugin-image (and potentially others) where the actual image element isn't found on the first render.`),y.createElement(`div`,null,`Image loads in: `,y.createElement(`span`,{role:`timer`},t/1e3)),y.createElement(o,e,y.createElement(R,{timer:t,alt:g.alt,src:g.src,height:`200`,width:`400`}))))},B=e=>{let{timer:t}=Z(5e3),n=t===0?void 0:`display-none`;return y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`A delayed `,y.createElement(`code`,null,`display: none;`),` image`),y.createElement(`div`,{className:`mw-600`},y.createElement(`p`,null,`This examples simulates an image being hidden with CSS and then shown after the countdown.`),y.createElement(`div`,null,`Image loads in: `,y.createElement(`span`,{role:`timer`},t/1e3)),y.createElement(o,e,y.createElement(`img`,{alt:m.alt,src:m.src,className:n,height:`320`,decoding:`async`,loading:`lazy`}))))},V=e=>(y.useEffect(()=>(document.body.classList.add(`change-icons`),()=>{document.body.classList.remove(`change-icons`)}),[]),y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`An image with custom zoom & unzoom icons`),y.createElement(`div`,{className:`mw-600`},y.createElement(`p`,null,`Press TAB to activate the zoom button`),y.createElement(`div`,null,y.createElement(o,{...e,IconZoom:()=>y.createElement(y.Fragment,null,`+`),IconUnzoom:()=>y.createElement(y.Fragment,null,`-`)},y.createElement(`img`,{alt:l.alt,src:l.src,width:`400`})))))),H=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Inline Image`),y.createElement(`p`,{className:`inline`},`This example is of an image that is inline with text.`,y.createElement(o,{...e,wrapElement:`span`},y.createElement(`img`,{alt:d.alt,src:d.src,height:`320`,decoding:`async`,loading:`lazy`})))),U=e=>{let[t,n]=y.useState(d);return y.useEffect(()=>{let e=setInterval(()=>{n(_([d,g,u,m,p,s,f,l])[0])},3e3);return()=>{clearInterval(e)}},[]),y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Cycle through images`),y.createElement(`p`,null,`This helps to test the ghost element that positions the button. Press Tab to focus the button, then sit and watch it reposition with each new image!`),y.createElement(`p`,null,y.createElement(o,{...e,wrapElement:`span`},y.createElement(`img`,{alt:t.alt,src:t.src,height:`320`,decoding:`async`,loading:`lazy`}))))},W=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Swipe to Unzoom Disabled`),y.createElement(`p`,null,`This example demonstrates preventing swipe gestures from unzooming when an image is zoomed. This is best tested on a touchscreen device!`),y.createElement(`div`,null,y.createElement(o,{...e,canSwipeToUnzoom:!1},y.createElement(`img`,{alt:d.alt,src:d.src,height:`320`,decoding:`async`,loading:`lazy`})))),G=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Swipe to Unzoom Threshold`),y.createElement(`p`,null,`This example demonstrates increasing the threshold required for a swipe gesture on a touchscreen device to unzoom when an image is zoomed. This is best tested on a touchscreen device!`),y.createElement(`p`,null,`The default is `,y.createElement(`code`,null,`10`),` (px), but this example is set to`,` `,y.createElement(`code`,null,`200`),` (px); that's how far you'll have to move your finger across the screen.`),y.createElement(`div`,null,y.createElement(o,{...e,swipeToUnzoomThreshold:200},y.createElement(`img`,{alt:d.alt,src:d.src,height:`320`,decoding:`async`,loading:`lazy`})))),K=e=>y.createElement(`main`,{"aria-label":`Story`},y.createElement(`h1`,null,`Selecting cards and zooming without triggering selection state`),y.createElement(`div`,{className:`mw-600`,style:{display:`flex`,flexDirection:`column`}},y.createElement(`ul`,{className:`cards`},y.createElement(v,{alt:d.alt,src:d.src,zoomProps:e}),y.createElement(v,{alt:f.alt,src:f.src,zoomProps:e})))),q=e=>{let[t,n]=y.useState(0),[r,i]=y.useState(0),[a,s]=y.useState(0),c=y.useRef(!1);y.useEffect(()=>{let e=()=>{n(window.scrollY),i(e=>e+1),c.current&&s(e=>e+1)};return window.addEventListener(`scroll`,e,{passive:!0}),()=>{window.removeEventListener(`scroll`,e)}},[]);let l=e=>{e?c.current=!0:window.setTimeout(()=>{c.current=!1},150)},u=t>200;return y.createElement(`main`,{"aria-label":`Story`},y.createElement(`header`,{style:{position:`fixed`,top:0,left:0,right:0,zIndex:1,display:`flex`,flexWrap:`wrap`,gap:16,alignItems:`center`,padding:u?`8px 16px`:`24px 16px`,background:u?`#1f2937`:`#2563eb`,color:`#fff`,fontFamily:`sans-serif`,transition:`padding 250ms ease, background 250ms ease`}},y.createElement(`strong`,{style:{fontSize:u?16:22,transition:`font-size 250ms ease`}},u?`Header — COMPACT`:`Header — EXPANDED`),y.createElement(`span`,null,`scrollY: `,Math.round(t)),y.createElement(`span`,null,`scroll events: `,r),y.createElement(`span`,{style:{color:a>0?`#fca5a5`:`#86efac`}},`phantom (during zoom): `,a)),y.createElement(`div`,{style:{padding:`96px 16px 16px`,maxWidth:640}},y.createElement(`h1`,null,`Scroll-position UI stays stable across zoom (#1085)`),y.createElement(`ol`,null,y.createElement(`li`,null,`Scroll down until the header collapses to `,y.createElement(`strong`,null,`COMPACT`),` `,`(scrollY > `,200,`).`),y.createElement(`li`,null,`Without scrolling further, zoom the image, then close it.`),y.createElement(`li`,null,`✅ Fixed: the header stays COMPACT, `,y.createElement(`code`,null,`scrollY`),` is unchanged, and `,y.createElement(`strong`,null,`phantom (during zoom)`),` stays`,` `,y.createElement(`strong`,null,`0`),`.`),y.createElement(`li`,null,`❌ Before the fix: the header flickered EXPANDED→COMPACT and the phantom counter jumped by 2 each cycle (the body scroll-lock used`,` `,y.createElement(`code`,null,`position: fixed`),`, which zeroed `,y.createElement(`code`,null,`scrollY`),`).`))),y.createElement(`div`,{"aria-hidden":`true`,style:{height:`150vh`,display:`flex`,alignItems:`center`,justifyContent:`center`,color:`#888`,background:`linear-gradient(#fafafa, #d8d8d8)`}},`↓ keep scrolling ↓`),y.createElement(`div`,{style:{padding:16,maxWidth:640}},y.createElement(o,{...e,onZoomChange:l},y.createElement(`img`,{alt:d.alt,src:d.src,height:`320`,decoding:`async`}))),y.createElement(`div`,{"aria-hidden":`true`,style:{height:`120vh`}}))},q.storyName=`Scroll Position UI Stays Stable`,q.parameters={layout:`fullscreen`},J=T.bind({}),J.args={...T.args},J.storyName=`(Automated Test)`,J.play=async({canvasElement:e})=>{let t=x(e);await b(async()=>{await C(t.getByLabelText(`Expand image: ${d.alt}`)).toBeVisible()}),await X(1e3),await S.tab(),await S.keyboard(`{Enter}`,{delay:1e3}),await b(async()=>{let e=document.querySelector(`dialog`);if(e==null)throw Error(`rmiz automated test failure: cannot find <dialog>`);await C(e).toHaveAttribute(`open`),await C(e.querySelector(`img[alt="${d.alt}"]`)).toBeVisible(),await C(e.querySelector(`[aria-label="Minimize image"`)).toHaveFocus()}),await X(1e3),await S.keyboard(`{Escape}`,{delay:1e3}),await b(async()=>{await C(document.querySelector(`dialog`)).not.toHaveAttribute(`open`),await C(t.getByLabelText(`Expand image: ${d.alt}`)).toHaveFocus()})},Y=e=>{let t=[];for(let n in e)e[n]===!0&&t.push(n);return t.join(` `)},X=async e=>{await new Promise(t=>{setTimeout(t,e)})},Z=e=>{let[t,n]=y.useState(e);return y.useEffect(()=>{let e=setInterval(()=>{t===0?clearInterval(e):n(t-1e3)},1e3);return()=>{clearInterval(e)}},[t]),{timer:t}},T.__docgenInfo={description:``,methods:[],displayName:`Regular`},E.__docgenInfo={description:``,methods:[],displayName:`ZoomMargin`},D.__docgenInfo={description:``,methods:[],displayName:`SmallPortrait`},O.__docgenInfo={description:``,methods:[],displayName:`SVGSource`},k.__docgenInfo={description:``,methods:[],displayName:`DataSVGSource`},A.__docgenInfo={description:``,methods:[],displayName:`ProvideZoomImg`},M.__docgenInfo={description:``,methods:[],displayName:`ZoomImgLoader`},N.__docgenInfo={description:``,methods:[],displayName:`SmallSrcSize`},P.__docgenInfo={description:``,methods:[],displayName:`CustomModalStyles`},F.__docgenInfo={description:``,methods:[],displayName:`ZoomImageFromInsideDialog`},I.__docgenInfo={description:``,methods:[],displayName:`ModalFigureCaption`},z.__docgenInfo={description:``,methods:[],displayName:`DelayedImageRender`},B.__docgenInfo={description:``,methods:[],displayName:`DelayedDisplayNone`},V.__docgenInfo={description:``,methods:[],displayName:`CustomButtonIcons`},H.__docgenInfo={description:``,methods:[],displayName:`InlineImage`},U.__docgenInfo={description:``,methods:[],displayName:`CycleImages`},W.__docgenInfo={description:``,methods:[],displayName:`SwipeToUnzoomDisabled`},G.__docgenInfo={description:``,methods:[],displayName:`SwipeToUnzoomThreshold`},K.__docgenInfo={description:``,methods:[],displayName:`SelectCards`},q.__docgenInfo={description:`Manual regression demo for the #1085 follow-up: opening/closing the zoom must
not perturb \`window.scrollY\` or fire phantom \`scroll\` events, or
scroll-position-driven UI reacts as if the user scrolled. The header collapses
on scroll; the "phantom" counter must stay 0 across a zoom cycle.
https://github.com/rpearce/react-medium-image-zoom/issues/1085`,methods:[],displayName:`ScrollPositionUiStaysStable`},Q=[`Regular`,`ZoomMargin`,`SmallPortrait`,`SVGSource`,`DataSVGSource`,`ProvideZoomImg`,`ZoomImgLoader`,`SmallSrcSize`,`CustomModalStyles`,`ZoomImageFromInsideDialog`,`ModalFigureCaption`,`DelayedImageRender`,`DelayedDisplayNone`,`CustomButtonIcons`,`InlineImage`,`CycleImages`,`SwipeToUnzoomDisabled`,`SwipeToUnzoomThreshold`,`SelectCards`,`ScrollPositionUiStaysStable`,`AutomatedTest`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`props => {
  const handleZoomChange = React.useCallback<NonNullable<React.ComponentProps<typeof Zoom>['onZoomChange']>>((value, {
    event
  }) => {
    console.log('handleZoomChange info!', {
      value,
      event
    });
  }, []);
  return <main aria-label="Story">
      <h1>Zooming a regular image</h1>
      <div className="mw-600" style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
        <Zoom {...props} onZoomChange={handleZoomChange} wrapElement="span">
          <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
        </Zoom>
      </div>
    </main>;
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>Setting a zoomMargin of 45(px)</h1>
    <div className="mw-600">
      <p>
        This example should always be offset from the window by at least 45px
      </p>
      <Zoom {...props} zoomMargin={45}>
        <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>A portrait image with a small width specified</h1>
    <div className="mw-600">
      <p>Small size specifications scale well, too — even on mobile.</p>
      <Zoom {...props}>
        <img alt={imgTeAraiPoint.alt} src={imgTeAraiPoint.src} height="112" decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>An image with an SVG src</h1>
    <div className="mw-600">
      <Zoom {...props}>
        <img alt={imgNzMap.alt} src={imgNzMap.src} width="150" decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => <main aria-label="Story">
    <h1>
      An image with a <code>data:image/svg+xml</code> <code>src</code>
    </h1>
    <div className="data-uri-img mw-600">
      <Zoom>
        <img alt="Gatsby G Logo" src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E" />
      </Zoom>
    </div>
  </main>`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>
      An image with a larger <code>zoomImg</code>
    </h1>
    <div className="mw-600">
      <p>
        When zoomed, the original image will scale to as large as the window
        will allow, and then it will be replaced by an image that is downloaded
        in the background.
      </p>
      <Zoom {...props} zoomImg={{
      alt: imgKeaLarge.alt,
      src: imgKeaLarge.src
    }}>
        <img alt={imgKeaSmall.alt} src={imgKeaSmall.src} width="150" />
      </Zoom>
    </div>
  </main>`,...A.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>ZoomImg with Loading State</h1>
    <div className="mw-600">
      <p>
        This example shows how to provide loading feedback when using a
        high-resolution <code>zoomImg</code>. The <code>ZoomContent</code>{' '}
        component uses the <code>isZoomImgLoaded</code> prop to display a
        loading spinner while the high-resolution image is being downloaded.
      </p>
      <p>
        Here the loading spinner is shown on every zoom, but in a real-world
        case, the browser caches the image, so you&apos;ll only see the loader
        at first load.
      </p>
      <Zoom {...props} zoomImg={{
      alt: imgKeaLarge.alt,
      src: imgKeaLarge.src
    }} ZoomContent={CustomZoomContentWithLoader}>
        <img alt={imgKeaSmall.alt} src={imgKeaSmall.src} width="150" />
      </Zoom>
      <h2>Code</h2>
      <pre>
        <code>
          {\`
const CustomZoomContent: UncontrolledProps['ZoomContent'] = ({
  img,
  isZoomImgLoaded,
}) => {
  return (
    <>
      {img}
      {!isZoomImgLoaded && (
        <div className='loader-wrapper'>
          <div className='loader' />
        </div>
      )}
    </>
  )
}

<Zoom
  zoomImg={{
    src: 'higher-res-image.jpg',
  }}
  ZoomContent={CustomZoomContent}
>
  <img src='low-res-image.jpg' width="150" />
</Zoom>
          \`}
        </code>
      </pre>
    </div>
  </main>`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>An image with a small size</h1>
    <div className="mw-600">
      <p>
        In order to prevent blurry images, An image won&apos;t scale up larger
        than its natural dimensions.
      </p>
      <Zoom {...props}>
        <img alt={imgKeaSmall.alt} src={imgKeaSmall.src} width="150" />
      </Zoom>
    </div>
  </main>`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>Custom Modal Styles</h1>
    <div className="mw-600">
      <p>Use CSS to customize the zoom modal styles.</p>
      <p>
        Here, we slow down the transition time and use a different overlay
        color.
      </p>
      <div>
        <Zoom {...props} classDialog="custom-zoom">
          <img alt={imgGlenorchyLagoon.alt} src={imgGlenorchyLagoon.src} width="400" />
        </Zoom>
      </div>
      <p>
        The CSS class, <code>custom-zoom</code>, is sent to the component via
        the <code>classDialog</code> string prop. Here are the styles used:
      </p>
      <pre>
        <code>
          {\`
.custom-zoom [data-rmiz-modal-overlay],
.custom-zoom [data-rmiz-modal-img] {
  transition-duration: 0.8s;
  transition-timing-function: linear;
}
.custom-zoom [data-rmiz-modal-overlay="hidden"] {
  background-color: rgb(56, 58, 89, 0);
}
.custom-zoom [data-rmiz-modal-overlay="visible"] {
  background-color: rgb(56, 58, 89, 1);
}
.custom-zoom [data-rmiz-btn-unzoom] {
  background-color: #bd93f9;
  color: #000;
}
.custom-zoom [data-rmiz-btn-unzoom]:focus-visible {
  outline-offset: 0.4rem;
  outline: 0.2rem solid #bd93f9;
}
\`}
        </code>
      </pre>
    </div>
  </main>`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`props => {
  const refBtn = React.useRef<HTMLButtonElement>(null);
  const refModal = React.useRef<HTMLDialogElement>(null);
  const handleBtnClick = React.useCallback(() => {
    refModal.current?.showModal();
  }, []);
  React.useEffect(() => {
    const handleDocumentClick = (e: MouseEvent): void => {
      const {
        target
      } = e;
      if (!(target instanceof Element)) return;
      if (refBtn.current?.contains(target) !== true && refModal.current?.contains(target) !== true) {
        refModal.current?.close();
      }
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
  return <main aria-label="Story">
      <h1>Zoom Image From Inside Dialog</h1>
      <div className="mw-600">
        <button onClick={handleBtnClick} ref={refBtn} type="button">
          Open Modal
        </button>
        <dialog aria-modal="true" ref={refModal}>
          <form method="dialog">
            <button type="submit">Close</button>
          </form>
          <h1>Zooming should work!</h1>
          <div>
            <Zoom {...props}>
              <img alt={imgGlenorchyLagoon.alt} src={imgGlenorchyLagoon.src} width="400" />
            </Zoom>
          </div>
        </dialog>
      </div>
    </main>;
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`props => {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const handleZoomChange = React.useCallback((value: boolean) => {
    setIsZoomed(value);
  }, []);
  return <main aria-label="Story">
      <h1>Modal With Figure And Caption</h1>
      <p>
        If you want more control over the zoom modal&apos;s content, you can
        pass a <code>ZoomContent</code> component.
      </p>

      <h2>Uncontrolled</h2>
      <div className="mw-600">
        <Zoom {...props} ZoomContent={CustomZoomContent}>
          <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
        </Zoom>
      </div>

      <h2>Controlled</h2>
      <p>
        Regression for{' '}
        <a href="https://github.com/rpearce/react-medium-image-zoom/issues/448">
          issue #448
        </a>
        : when the parent owns <code>isZoomed</code> and passes{' '}
        <code>ZoomContent</code> as an inline arrow function, its identity
        changes on every parent render, causing the modal subtree to remount.
        Zoom and unzoom should both animate smoothly.
      </p>
      <div className="mw-600">
        <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange} ZoomContent={zoomProps => <CustomZoomContent {...zoomProps} />}>
          <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
        </ControlledZoom>
      </div>
    </main>;
}`,...I.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`props => {
  const {
    timer
  } = useTimer(5000);
  return <main aria-label="Story">
      <h1>A sub-component which delays rendering</h1>
      <div className="mw-600">
        <p>
          This examples simulates an issue caused by the gatsby-plugin-image
          (and potentially others) where the actual image element isn&apos;t
          found on the first render.
        </p>
        <div>
          Image loads in: <span role="timer">{timer / 1000}</span>
        </div>
        <Zoom {...props}>
          <DelayedImg timer={timer} alt={imgEarth.alt} src={imgEarth.src} height="200" width="400" />
        </Zoom>
      </div>
    </main>;
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`props => {
  const {
    timer
  } = useTimer(5000);
  const classImg = timer === 0 ? undefined : 'display-none';
  return <main aria-label="Story">
      <h1>
        A delayed <code>display: none;</code> image
      </h1>
      <div className="mw-600">
        <p>
          This examples simulates an image being hidden with CSS and then shown
          after the countdown.
        </p>
        <div>
          Image loads in: <span role="timer">{timer / 1000}</span>
        </div>
        <Zoom {...props}>
          <img alt={imgTekapo.alt} src={imgTekapo.src} className={classImg} height="320" decoding="async" loading="lazy" />
        </Zoom>
      </div>
    </main>;
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`props => {
  React.useEffect(() => {
    document.body.classList.add('change-icons');
    return () => {
      document.body.classList.remove('change-icons');
    };
  }, []);
  return <main aria-label="Story">
      <h1>An image with custom zoom &amp; unzoom icons</h1>
      <div className="mw-600">
        <p>Press TAB to activate the zoom button</p>
        <div>
          <Zoom {...props} IconZoom={() => <>+</>} IconUnzoom={() => <>-</>}>
            <img alt={imgHookerValleyTrack.alt} src={imgHookerValleyTrack.src} width="400" />
          </Zoom>
        </div>
      </div>
    </main>;
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>Inline Image</h1>
    <p className="inline">
      This example is of an image that is inline with text.
      <Zoom {...props} wrapElement="span">
        <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
      </Zoom>
    </p>
  </main>`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`props => {
  const [img, setImg] = React.useState<{
    alt: string;
    src: string;
  }>(imgThatWanakaTree);
  React.useEffect(() => {
    const interval = setInterval(() => {
      setImg(shuffle([imgThatWanakaTree, imgEarth, imgNzMap, imgTekapo, imgKeaLarge, imgTeAraiPoint, imgGlenorchyLagoon, imgHookerValleyTrack] as const)[0]);
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return <main aria-label="Story">
      <h1>Cycle through images</h1>
      <p>
        This helps to test the ghost element that positions the button. Press
        Tab to focus the button, then sit and watch it reposition with each new
        image!
      </p>
      <p>
        <Zoom {...props} wrapElement="span">
          <img alt={img.alt} src={img.src} height="320" decoding="async" loading="lazy" />
        </Zoom>
      </p>
    </main>;
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>Swipe to Unzoom Disabled</h1>
    <p>
      This example demonstrates preventing swipe gestures from unzooming when an
      image is zoomed. This is best tested on a touchscreen device!
    </p>
    <div>
      <Zoom {...props} canSwipeToUnzoom={false}>
        <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>Swipe to Unzoom Threshold</h1>
    <p>
      This example demonstrates increasing the threshold required for a swipe
      gesture on a touchscreen device to unzoom when an image is zoomed. This is
      best tested on a touchscreen device!
    </p>
    <p>
      The default is <code>10</code> (px), but this example is set to{' '}
      <code>200</code> (px); that&apos;s how far you&apos;ll have to move your
      finger across the screen.
    </p>
    <div>
      <Zoom {...props} swipeToUnzoomThreshold={200}>
        <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>Selecting cards and zooming without triggering selection state</h1>
    <div className="mw-600" style={{
    display: 'flex',
    flexDirection: 'column'
  }}>
      <ul className="cards">
        <CardItem alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} zoomProps={props} />
        <CardItem alt={imgGlenorchyLagoon.alt} src={imgGlenorchyLagoon.src} zoomProps={props} />
      </ul>
    </div>
  </main>`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`props => {
  const threshold = 200;
  const [scrollY, setScrollY] = React.useState(0);
  const [scrollEvents, setScrollEvents] = React.useState(0);
  const [phantomEvents, setPhantomEvents] = React.useState(0);
  const zoomWindowRef = React.useRef(false);
  React.useEffect(() => {
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
      setScrollEvents(n => n + 1);

      // A scroll event firing while a zoom is opening/closing is a phantom: the
      // user did not scroll, so off iOS this must never happen.
      if (zoomWindowRef.current) {
        setPhantomEvents(n => n + 1);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleZoomChange = (active: boolean): void => {
    if (active) {
      zoomWindowRef.current = true;
    } else {
      // Keep the window open briefly so the close-time restore scroll event (if
      // any) is still attributed to this zoom cycle.
      window.setTimeout(() => {
        zoomWindowRef.current = false;
      }, 150);
    }
  };
  const isCompact = scrollY > threshold;
  return <main aria-label="Story">
      <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1,
      display: 'flex',
      flexWrap: 'wrap',
      gap: 16,
      alignItems: 'center',
      padding: isCompact ? '8px 16px' : '24px 16px',
      background: isCompact ? '#1f2937' : '#2563eb',
      color: '#fff',
      fontFamily: 'sans-serif',
      transition: 'padding 250ms ease, background 250ms ease'
    }}>
        <strong style={{
        fontSize: isCompact ? 16 : 22,
        transition: 'font-size 250ms ease'
      }}>
          {isCompact ? 'Header — COMPACT' : 'Header — EXPANDED'}
        </strong>
        <span>scrollY: {Math.round(scrollY)}</span>
        <span>scroll events: {scrollEvents}</span>
        <span style={{
        color: phantomEvents > 0 ? '#fca5a5' : '#86efac'
      }}>
          phantom (during zoom): {phantomEvents}
        </span>
      </header>

      <div style={{
      padding: '96px 16px 16px',
      maxWidth: 640
    }}>
        <h1>Scroll-position UI stays stable across zoom (#1085)</h1>
        <ol>
          <li>
            Scroll down until the header collapses to <strong>COMPACT</strong>{' '}
            (scrollY &gt; {threshold}).
          </li>
          <li>Without scrolling further, zoom the image, then close it.</li>
          <li>
            ✅ Fixed: the header stays COMPACT, <code>scrollY</code> is
            unchanged, and <strong>phantom (during zoom)</strong> stays{' '}
            <strong>0</strong>.
          </li>
          <li>
            ❌ Before the fix: the header flickered EXPANDED→COMPACT and the
            phantom counter jumped by 2 each cycle (the body scroll-lock used{' '}
            <code>position: fixed</code>, which zeroed <code>scrollY</code>).
          </li>
        </ol>
      </div>

      <div aria-hidden="true" style={{
      height: '150vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#888',
      background: 'linear-gradient(#fafafa, #d8d8d8)'
    }}>
        ↓ keep scrolling ↓
      </div>

      <div style={{
      padding: 16,
      maxWidth: 640
    }}>
        <Zoom {...props} onZoomChange={handleZoomChange}>
          <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" />
        </Zoom>
      </div>

      <div aria-hidden="true" style={{
      height: '120vh'
    }} />
    </main>;
}`,...q.parameters?.docs?.source},description:{story:`Manual regression demo for the #1085 follow-up: opening/closing the zoom must
not perturb \`window.scrollY\` or fire phantom \`scroll\` events, or
scroll-position-driven UI reacts as if the user scrolled. The header collapses
on scroll; the "phantom" counter must stay 0 across a zoom cycle.
https://github.com/rpearce/react-medium-image-zoom/issues/1085`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`props => {
  const handleZoomChange = React.useCallback<NonNullable<React.ComponentProps<typeof Zoom>['onZoomChange']>>((value, {
    event
  }) => {
    console.log('handleZoomChange info!', {
      value,
      event
    });
  }, []);
  return <main aria-label="Story">
      <h1>Zooming a regular image</h1>
      <div className="mw-600" style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
        <Zoom {...props} onZoomChange={handleZoomChange} wrapElement="span">
          <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
        </Zoom>
      </div>
    </main>;
}`,...J.parameters?.docs?.source}}}})))()}$();export{J as AutomatedTest,V as CustomButtonIcons,P as CustomModalStyles,U as CycleImages,k as DataSVGSource,B as DelayedDisplayNone,z as DelayedImageRender,H as InlineImage,I as ModalFigureCaption,A as ProvideZoomImg,T as Regular,O as SVGSource,q as ScrollPositionUiStaysStable,K as SelectCards,D as SmallPortrait,N as SmallSrcSize,W as SwipeToUnzoomDisabled,G as SwipeToUnzoomThreshold,F as ZoomImageFromInsideDialog,M as ZoomImgLoader,E as ZoomMargin,Q as __namedExportsOrder,w as default};