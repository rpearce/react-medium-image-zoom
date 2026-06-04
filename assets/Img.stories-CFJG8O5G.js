import{R as e}from"./iframe-lsAMA5uG.js";import{C as q}from"./styles-Dv2PQVs6.js";/* empty css             */import{d as j,i as u,a as r,f as Q,j as F,k as R,l as E,m as U,n as G}from"./index-CQ5SO9GX.js";import{U as l}from"./uncontrolled-Biu27nL6.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BI47bfFY.js";import"./index-DBdlsxl_.js";const{waitFor:W,within:X,userEvent:P,expect:A}=__STORYBOOK_MODULE_TEST__,ce={title:"<img>",component:l};function $(a){const o=structuredClone(a);for(let t=o.length-1;t>0;t-=1){const n=Math.floor(Math.random()*(t+1));[o[t],o[n]]=[o[n],o[t]]}return o}const g=a=>{const o=e.useCallback((t,{event:n})=>{console.log("handleZoomChange info!",{value:t,event:n})},[]);return e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Zooming a regular image"),e.createElement("div",{className:"mw-600",style:{display:"flex",flexDirection:"column"}},e.createElement(l,{...a,onZoomChange:o,wrapElement:"span"},e.createElement("img",{alt:r.alt,src:r.src,height:"320",decoding:"async",loading:"lazy"}))))},w=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Setting a zoomMargin of 45(px)"),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"This example should always be offset from the window by at least 45px"),e.createElement(l,{...a,zoomMargin:45},e.createElement("img",{alt:r.alt,src:r.src,height:"320",decoding:"async",loading:"lazy"})))),v=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"A portrait image with a small width specified"),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"Small size specifications scale well, too — even on mobile."),e.createElement(l,{...a},e.createElement("img",{alt:G.alt,src:G.src,height:"112",decoding:"async",loading:"lazy"})))),f=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"An image with an SVG src"),e.createElement("div",{className:"mw-600"},e.createElement(l,{...a},e.createElement("img",{alt:U.alt,src:U.src,width:"150",decoding:"async",loading:"lazy"})))),b=()=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"An image with a ",e.createElement("code",null,"data:image/svg+xml")," ",e.createElement("code",null,"src")),e.createElement("div",{className:"data-uri-img mw-600"},e.createElement(l,null,e.createElement("img",{alt:"Gatsby G Logo",src:"data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E"})))),S=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"An image with a larger ",e.createElement("code",null,"zoomImg")),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"When zoomed, the original image will scale to as large as the window will allow, and then it will be replaced by an image that is downloaded in the background."),e.createElement(l,{...a,zoomImg:{alt:R.alt,src:R.src}},e.createElement("img",{alt:E.alt,src:E.src,width:"150"})))),J=({img:a,isZoomImgLoaded:o,modalState:t})=>{const[n,s]=e.useState(!1);e.useEffect(()=>{if(t!=="LOADING"||!o)return;const i=setTimeout(()=>{s(!0)},1e3);return()=>{clearTimeout(i),s(!1)}},[o,t]);const m=t==="LOADING"&&!n;return e.createElement(e.Fragment,null,a,m&&e.createElement("div",{className:"zoom-img-loader-wrapper"},e.createElement("div",{className:"zoom-img-loader"})))},z=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"ZoomImg with Loading State"),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"This example shows how to provide loading feedback when using a high-resolution ",e.createElement("code",null,"zoomImg"),". The ",e.createElement("code",null,"ZoomContent")," ","component uses the ",e.createElement("code",null,"isZoomImgLoaded")," prop to display a loading spinner while the high-resolution image is being downloaded."),e.createElement("p",null,"Here the loading spinner is shown on every zoom, but in a real-world case, the browser caches the image, so you'll only see the loader at first load."),e.createElement(l,{...a,zoomImg:{alt:R.alt,src:R.src},ZoomContent:J},e.createElement("img",{alt:E.alt,src:E.src,width:"150"})),e.createElement("h2",null,"Code"),e.createElement("pre",null,e.createElement("code",null,`
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
          `)))),C=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"An image with a small size"),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"In order to prevent blurry images, An image won't scale up larger than its natural dimensions."),e.createElement(l,{...a},e.createElement("img",{alt:E.alt,src:E.src,width:"150"})))),T=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Custom Modal Styles"),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"Use CSS to customize the zoom modal styles."),e.createElement("p",null,"Here, we slow down the transition time and use a different overlay color."),e.createElement("div",null,e.createElement(l,{...a,classDialog:"custom-zoom"},e.createElement("img",{alt:u.alt,src:u.src,width:"400"}))),e.createElement("p",null,"The CSS class, ",e.createElement("code",null,"custom-zoom"),", is sent to the component via the ",e.createElement("code",null,"classDialog")," string prop. Here are the styles used:"),e.createElement("pre",null,e.createElement("code",null,`
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
`)))),Z=a=>{const o=e.useRef(null),t=e.useRef(null),n=e.useCallback(()=>{t.current?.showModal()},[]);return e.useEffect(()=>{const s=m=>{const{target:i}=m;i instanceof Element&&o.current?.contains(i)!==!0&&t.current?.contains(i)!==!0&&t.current?.close()};return document.addEventListener("click",s),()=>{document.removeEventListener("click",s)}},[]),e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Zoom Image From Inside Dialog"),e.createElement("div",{className:"mw-600"},e.createElement("button",{onClick:n,ref:o,type:"button"},"Open Modal"),e.createElement("dialog",{"aria-modal":"true",ref:t},e.createElement("form",{method:"dialog"},e.createElement("button",{type:"submit"},"Close")),e.createElement("h1",null,"Zooming should work!"),e.createElement("div",null,e.createElement(l,{...a},e.createElement("img",{alt:u.alt,src:u.src,width:"400"}))))))},I=a=>{const[o,t]=e.useState(!1),n=e.useCallback(s=>{t(s)},[]);return e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Modal With Figure And Caption"),e.createElement("p",null,"If you want more control over the zoom modal's content, you can pass a ",e.createElement("code",null,"ZoomContent")," component."),e.createElement("h2",null,"Uncontrolled"),e.createElement("div",{className:"mw-600"},e.createElement(l,{...a,ZoomContent:Y},e.createElement("img",{alt:r.alt,src:r.src,height:"320",decoding:"async",loading:"lazy"}))),e.createElement("h2",null,"Controlled"),e.createElement("p",null,"Regression for"," ",e.createElement("a",{href:"https://github.com/rpearce/react-medium-image-zoom/issues/448"},"issue #448"),": when the parent owns ",e.createElement("code",null,"isZoomed")," and passes"," ",e.createElement("code",null,"ZoomContent")," as an inline arrow function, its identity changes on every parent render, causing the modal subtree to remount. Zoom and unzoom should both animate smoothly."),e.createElement("div",{className:"mw-600"},e.createElement(q,{isZoomed:o,onZoomChange:n,ZoomContent:s=>e.createElement(Y,{...s})},e.createElement("img",{alt:r.alt,src:r.src,height:"320",decoding:"async",loading:"lazy"}))))},Y=({buttonUnzoom:a,modalState:o,img:t})=>{const n=o==="LOADED",s=e.isValidElement(t)?t:null,m=s?.props.width,i=s?.props.height,p=e.useMemo(()=>{const y=m!==void 0&&i!==void 0,c=y?m/i>window.innerWidth/window.innerHeight:!1;return ae({"zoom-caption":!0,"zoom-caption--loaded":n,"zoom-caption--bottom":y&&c,"zoom-caption--left":y&&!c})},[m,i,n]);return e.createElement(e.Fragment,null,a,e.createElement("figure",null,t,e.createElement("figcaption",{className:p},"That Wanaka Tree, also known as the Wanaka Willow, is a willow tree located at the southern end of Lake Wānaka in the Otago region of New Zealand.",e.createElement("cite",{className:"zoom-caption-cite"},"Wikipedia,"," ",e.createElement("a",{className:"zoom-caption-link",href:"https://en.wikipedia.org/wiki/That_Wanaka_Tree"},"That Wanaka Tree")))))},ee=a=>{const{alt:o,height:t,src:n,timer:s,width:m}=a,i=s===0?{opacity:0,visibility:"hidden",position:"absolute"}:{opacity:1};return e.useEffect(()=>{const p=new Image;p.src=n,p.decode()},[n]),e.createElement("div",null,e.createElement("img",{alt:"","aria-hidden":"true",decoding:"async",height:t,src:"data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAALABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgQA/8QAFgEBAQEAAAAAAAAAAAAAAAAAAgED/9oADAMBAAIQAxAAAAFutLOHXan/xAAaEAACAwEBAAAAAAAAAAAAAAAAEwIDEQES/9oACAEBAAEFAmyxnT3YKhiqxcD/xAAYEQADAQEAAAAAAAAAAAAAAAAAAQISUf/aAAgBAwEBPwFKjNdP/8QAFxEBAAMAAAAAAAAAAAAAAAAAAAERIf/aAAgBAgEBPwHFw//EABcQAQEBAQAAAAAAAAAAAAAAAAAxATL/2gAIAQEABj8Cq6qOUf/EAB0QAQACAgIDAAAAAAAAAAAAAAEAETFBIVFhcYH/2gAIAQEAAT8hLTa9xQK5/MRwq9wB94FrKsV+z//aAAwDAQACAAMAAAAQg+//xAAYEQACAwAAAAAAAAAAAAAAAAAAARFB0f/aAAgBAwEBPxBCxzaP/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAx/9oACAECAQE/EEUAZf/EAB0QAAICAgMBAAAAAAAAAAAAAAERADEhQVGRocH/2gAIAQEAAT8QrTbZUQmHR1CiO0TexMDR5OfZSZbuE1IcAh9n/9k=",style:i,width:m}),s===0&&e.createElement("img",{alt:o,decoding:"async",loading:"lazy",src:n,width:m}))},k=a=>{const{timer:o}=K(5e3);return e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"A sub-component which delays rendering"),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"This examples simulates an issue caused by the gatsby-plugin-image (and potentially others) where the actual image element isn't found on the first render."),e.createElement("div",null,"Image loads in: ",e.createElement("span",{role:"timer"},o/1e3)),e.createElement(l,{...a},e.createElement(ee,{timer:o,alt:F.alt,src:F.src,height:"200",width:"400"}))))},N=a=>{const{timer:o}=K(5e3),t=o===0?void 0:"display-none";return e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"A delayed ",e.createElement("code",null,"display: none;")," image"),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"This examples simulates an image being hidden with CSS and then shown after the countdown."),e.createElement("div",null,"Image loads in: ",e.createElement("span",{role:"timer"},o/1e3)),e.createElement(l,{...a},e.createElement("img",{alt:Q.alt,src:Q.src,className:t,height:"320",decoding:"async",loading:"lazy"}))))},x=a=>(e.useEffect(()=>(document.body.classList.add("change-icons"),()=>{document.body.classList.remove("change-icons")}),[]),e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"An image with custom zoom & unzoom icons"),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"Press TAB to activate the zoom button"),e.createElement("div",null,e.createElement(l,{...a,IconZoom:()=>e.createElement(e.Fragment,null,"+"),IconUnzoom:()=>e.createElement(e.Fragment,null,"-")},e.createElement("img",{alt:j.alt,src:j.src,width:"400"})))))),D=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Inline Image"),e.createElement("p",{className:"inline"},"This example is of an image that is inline with text.",e.createElement(l,{...a,wrapElement:"span"},e.createElement("img",{alt:r.alt,src:r.src,height:"320",decoding:"async",loading:"lazy"})))),L=a=>{const[o,t]=e.useState(r);return e.useEffect(()=>{const n=setInterval(()=>{t($([r,F,U,Q,R,G,u,j])[0])},3e3);return()=>{clearInterval(n)}},[]),e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Cycle through images"),e.createElement("p",null,"This helps to test the ghost element that positions the button. Press Tab to focus the button, then sit and watch it reposition with each new image!"),e.createElement("p",null,e.createElement(l,{...a,wrapElement:"span"},e.createElement("img",{alt:o.alt,src:o.src,height:"320",decoding:"async",loading:"lazy"}))))},B=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Swipe to Unzoom Disabled"),e.createElement("p",null,"This example demonstrates preventing swipe gestures from unzooming when an image is zoomed. This is best tested on a touchscreen device!"),e.createElement("div",null,e.createElement(l,{...a,canSwipeToUnzoom:!1},e.createElement("img",{alt:r.alt,src:r.src,height:"320",decoding:"async",loading:"lazy"})))),M=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Swipe to Unzoom Threshold"),e.createElement("p",null,"This example demonstrates increasing the threshold required for a swipe gesture on a touchscreen device to unzoom when an image is zoomed. This is best tested on a touchscreen device!"),e.createElement("p",null,"The default is ",e.createElement("code",null,"10")," (px), but this example is set to"," ",e.createElement("code",null,"200")," (px); that's how far you'll have to move your finger across the screen."),e.createElement("div",null,e.createElement(l,{...a,swipeToUnzoomThreshold:200},e.createElement("img",{alt:r.alt,src:r.src,height:"320",decoding:"async",loading:"lazy"})))),_=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Selecting cards and zooming without triggering selection state"),e.createElement("div",{className:"mw-600",style:{display:"flex",flexDirection:"column"}},e.createElement("ul",{className:"cards"},e.createElement(O,{alt:r.alt,src:r.src,zoomProps:a}),e.createElement(O,{alt:u.alt,src:u.src,zoomProps:a}))));function O({alt:a,src:o,zoomProps:t}){const[n,s]=e.useState(!1),m=e.useCallback(()=>{s(c=>!c)},[]),i=e.useCallback(c=>{c.stopPropagation()},[]),p=e.useCallback(c=>{s(c.currentTarget.checked)},[]),y=e.useCallback((c,{event:H})=>{H.stopPropagation(),console.log("handleZoomChange (after event.stopPropagation())",{value:c,event:H})},[]);return e.createElement("li",{className:"card",onClick:m},e.createElement("label",null,e.createElement("input",{"aria-label":"Select item",checked:n,onChange:p,onClick:i,type:"checkbox"})),e.createElement(l,{...t,onZoomChange:y,wrapElement:"span"},e.createElement("img",{alt:a,src:o,height:"320",width:"320",decoding:"async",loading:"lazy"})))}const d=a=>(e.useEffect(()=>{const o=document.documentElement,t=o.style.scrollBehavior;return o.style.scrollBehavior="smooth",()=>{o.style.scrollBehavior=t}},[]),e.createElement("main",{"aria-label":"Story"},e.createElement("div",{style:{padding:16,maxWidth:640}},e.createElement("h1",null,"Scroll restore on close (#1085)"),e.createElement("p",null,"Scroll down to the image, zoom it, then close it. Your position should restore ",e.createElement("strong",null,"instantly")," — no jump — even though this page uses ",e.createElement("code",null,"scroll-behavior: smooth"),".")),e.createElement("div",{"aria-hidden":"true",style:{height:"150vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#888",background:"linear-gradient(#fafafa, #d8d8d8)"}},"↓ keep scrolling ↓"),e.createElement("div",{style:{padding:16,maxWidth:640}},e.createElement(l,{...a},e.createElement("img",{alt:r.alt,src:r.src,height:"320",decoding:"async"}))),e.createElement("div",{"aria-hidden":"true",style:{height:"120vh"}})));d.parameters={layout:"fullscreen"};const h=g.bind({});h.args={...g.args};h.storyName="(Automated Test)";h.play=async({canvasElement:a})=>{const o=X(a);await W(async()=>{await A(o.getByLabelText(`Expand image: ${r.alt}`)).toBeVisible()}),await V(1e3),await P.tab(),await P.keyboard("{Enter}",{delay:1e3}),await W(async()=>{const t=document.querySelector("dialog");if(t==null)throw new Error("rmiz automated test failure: cannot find <dialog>");await A(t).toHaveAttribute("open"),await A(t.querySelector(`img[alt="${r.alt}"]`)).toBeVisible(),await A(t.querySelector('[aria-label="Minimize image"')).toHaveFocus()}),await V(1e3),await P.keyboard("{Escape}",{delay:1e3}),await W(async()=>{await A(document.querySelector("dialog")).not.toHaveAttribute("open"),await A(o.getByLabelText(`Expand image: ${r.alt}`)).toHaveFocus()})};const ae=a=>{const o=[];for(const t in a)a[t]===!0&&o.push(t);return o.join(" ")},V=async a=>{await new Promise(o=>{setTimeout(o,a)})},K=a=>{const[o,t]=e.useState(a);return e.useEffect(()=>{const n=setInterval(()=>{o===0?clearInterval(n):t(o-1e3)},1e3);return()=>{clearInterval(n)}},[o]),{timer:o}};g.__docgenInfo={description:"",methods:[],displayName:"Regular"};w.__docgenInfo={description:"",methods:[],displayName:"ZoomMargin"};v.__docgenInfo={description:"",methods:[],displayName:"SmallPortrait"};f.__docgenInfo={description:"",methods:[],displayName:"SVGSource"};b.__docgenInfo={description:"",methods:[],displayName:"DataSVGSource"};S.__docgenInfo={description:"",methods:[],displayName:"ProvideZoomImg"};z.__docgenInfo={description:"",methods:[],displayName:"ZoomImgLoader"};C.__docgenInfo={description:"",methods:[],displayName:"SmallSrcSize"};T.__docgenInfo={description:"",methods:[],displayName:"CustomModalStyles"};Z.__docgenInfo={description:"",methods:[],displayName:"ZoomImageFromInsideDialog"};I.__docgenInfo={description:"",methods:[],displayName:"ModalFigureCaption"};k.__docgenInfo={description:"",methods:[],displayName:"DelayedImageRender"};N.__docgenInfo={description:"",methods:[],displayName:"DelayedDisplayNone"};x.__docgenInfo={description:"",methods:[],displayName:"CustomButtonIcons"};D.__docgenInfo={description:"",methods:[],displayName:"InlineImage"};L.__docgenInfo={description:"",methods:[],displayName:"CycleImages"};B.__docgenInfo={description:"",methods:[],displayName:"SwipeToUnzoomDisabled"};M.__docgenInfo={description:"",methods:[],displayName:"SwipeToUnzoomThreshold"};_.__docgenInfo={description:"",methods:[],displayName:"SelectCards"};d.__docgenInfo={description:"Manual regression demo for #1085: with `scroll-behavior: smooth`, closing the\nzoom must restore the scroll position instantly, with no animated jump.\nhttps://github.com/rpearce/react-medium-image-zoom/issues/1085",methods:[],displayName:"ScrollRestoreOnClose"};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`props => {
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
}`,...g.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>Setting a zoomMargin of 45(px)</h1>
    <div className="mw-600">
      <p>
        This example should always be offset from the window by at least 45px
      </p>
      <Zoom {...props} zoomMargin={45}>
        <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...w.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>A portrait image with a small width specified</h1>
    <div className="mw-600">
      <p>Small size specifications scale well, too — even on mobile.</p>
      <Zoom {...props}>
        <img alt={imgTeAraiPoint.alt} src={imgTeAraiPoint.src} height="112" decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...v.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>An image with an SVG src</h1>
    <div className="mw-600">
      <Zoom {...props}>
        <img alt={imgNzMap.alt} src={imgNzMap.src} width="150" decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...f.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => <main aria-label="Story">
    <h1>
      An image with a <code>data:image/svg+xml</code> <code>src</code>
    </h1>
    <div className="data-uri-img mw-600">
      <Zoom>
        <img alt="Gatsby G Logo" src="data:image/svg+xml,%3Csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2a10 10 0 110 20 10 10 0 010-20zm0 2c-3.73 0-6.86 2.55-7.75 6L14 19.75c3.45-.89 6-4.02 6-7.75h-5.25v1.5h3.45a6.37 6.37 0 01-3.89 4.44L6.06 9.69C7 7.31 9.3 5.63 12 5.63c2.13 0 4 1.04 5.18 2.65l1.23-1.06A7.959 7.959 0 0012 4zm-8 8a8 8 0 008 8c.04 0 .09 0-8-8z' fill='%23639'/%3E%3C/svg%3E" />
      </Zoom>
    </div>
  </main>`,...b.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
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
  </main>`,...S.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
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
  </main>`,...z.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
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
  </main>`,...C.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
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
  </main>`,...T.parameters?.docs?.source}}};Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`props => {
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
}`,...Z.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`props => {
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
}`,...I.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`props => {
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
}`,...k.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`props => {
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
}`,...N.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`props => {
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
}`,...x.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>Inline Image</h1>
    <p className="inline">
      This example is of an image that is inline with text.
      <Zoom {...props} wrapElement="span">
        <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" loading="lazy" />
      </Zoom>
    </p>
  </main>`,...D.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`props => {
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
}`,...L.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
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
  </main>`,...B.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
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
  </main>`,...M.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
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
  </main>`,..._.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`props => {
  // #1085 only reproduces with smooth scrolling enabled.
  React.useEffect(() => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'smooth';
    return () => {
      html.style.scrollBehavior = prev;
    };
  }, []);
  return <main aria-label="Story">
      <div style={{
      padding: 16,
      maxWidth: 640
    }}>
        <h1>Scroll restore on close (#1085)</h1>
        <p>
          Scroll down to the image, zoom it, then close it. Your position should
          restore <strong>instantly</strong> — no jump — even though this page
          uses <code>scroll-behavior: smooth</code>.
        </p>
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
        <Zoom {...props}>
          <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" decoding="async" />
        </Zoom>
      </div>

      <div aria-hidden="true" style={{
      height: '120vh'
    }} />
    </main>;
}`,...d.parameters?.docs?.source},description:{story:"Manual regression demo for #1085: with `scroll-behavior: smooth`, closing the\nzoom must restore the scroll position instantly, with no animated jump.\nhttps://github.com/rpearce/react-medium-image-zoom/issues/1085",...d.parameters?.docs?.description}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`props => {
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
}`,...h.parameters?.docs?.source}}};const de=["Regular","ZoomMargin","SmallPortrait","SVGSource","DataSVGSource","ProvideZoomImg","ZoomImgLoader","SmallSrcSize","CustomModalStyles","ZoomImageFromInsideDialog","ModalFigureCaption","DelayedImageRender","DelayedDisplayNone","CustomButtonIcons","InlineImage","CycleImages","SwipeToUnzoomDisabled","SwipeToUnzoomThreshold","SelectCards","ScrollRestoreOnClose","AutomatedTest"];export{h as AutomatedTest,x as CustomButtonIcons,T as CustomModalStyles,L as CycleImages,b as DataSVGSource,N as DelayedDisplayNone,k as DelayedImageRender,D as InlineImage,I as ModalFigureCaption,S as ProvideZoomImg,g as Regular,f as SVGSource,d as ScrollRestoreOnClose,_ as SelectCards,v as SmallPortrait,C as SmallSrcSize,B as SwipeToUnzoomDisabled,M as SwipeToUnzoomThreshold,Z as ZoomImageFromInsideDialog,z as ZoomImgLoader,w as ZoomMargin,de as __namedExportsOrder,ce as default};
