import{R as e}from"./iframe-Dss1ZtmY.js";import{C as s}from"./styles-CuedcTfr.js";/* empty css             */import{a as m}from"./index-CQ5SO9GX.js";import"./preload-helper-PPVm8Dsz.js";import"./index-BqvHeCSa.js";import"./index-CpYsQ5c2.js";const y={title:"Custom Controls",component:s},o=r=>{const[d,a]=e.useState(!1),n=e.useCallback(t=>{t.key==="j"||t.keyCode===74?a(!0):(t.key==="k"||t.keyCode===75)&&a(!1)},[]);return e.useEffect(()=>(document.addEventListener("keydown",n),()=>{document.removeEventListener("keydown",n)}),[n]),e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Custom zoom and unzoom controls"),e.createElement("div",{className:"jk mw-600"},e.createElement("p",null,'Click into this window, then use "j" to zoom and "k" to unzoom'),e.createElement(s,{...r,isZoomed:d,onZoomChange:void 0},e.createElement("img",{alt:m.alt,src:m.src,width:"500"}))))};o.__docgenInfo={description:"",methods:[],displayName:"JAndKZoomUnzoom"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`props => {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'j' || e.keyCode === 74) {
      setIsZoomed(true);
    } else if (e.key === 'k' || e.keyCode === 75) {
      setIsZoomed(false);
    }
  }, []);
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  return <main aria-label="Story">
      <h1>Custom zoom and unzoom controls</h1>
      <div className="jk mw-600">
        <p>
          Click into this window, then use &quot;j&quot; to zoom and
          &quot;k&quot; to unzoom
        </p>
        <Zoom {...props} isZoomed={isZoomed} onZoomChange={undefined /* do nothing */}>
          <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} width="500" />
        </Zoom>
      </div>
    </main>;
}`,...o.parameters?.docs?.source}}};const f=["JAndKZoomUnzoom"];export{o as JAndKZoomUnzoom,f as __namedExportsOrder,y as default};
