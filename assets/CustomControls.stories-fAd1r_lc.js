import{R as e}from"./iframe-CWsz1mvJ.js";import{C as s}from"./styles-DyaEOR1W.js";/* empty css             */import{a as m}from"./index-CQ5SO9GX.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Bf9GNJ4R.js";import"./index-Bd5jZ_8S.js";const f={title:"Custom Controls",component:s},o=r=>{const[d,n]=e.useState(!1),t=e.useCallback(a=>{a.key==="j"?n(!0):a.key==="k"&&n(!1)},[]);return e.useEffect(()=>(document.addEventListener("keydown",t),()=>{document.removeEventListener("keydown",t)}),[t]),e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Custom zoom and unzoom controls"),e.createElement("div",{className:"jk mw-600"},e.createElement("p",null,'Click into this window, then use "j" to zoom and "k" to unzoom'),e.createElement(s,{...r,isZoomed:d,onZoomChange:void 0},e.createElement("img",{alt:m.alt,src:m.src,width:"500"}))))};o.__docgenInfo={description:"",methods:[],displayName:"JAndKZoomUnzoom"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`props => {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'j') {
      setIsZoomed(true);
    } else if (e.key === 'k') {
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
}`,...o.parameters?.docs?.source}}};const w=["JAndKZoomUnzoom"];export{o as JAndKZoomUnzoom,w as __namedExportsOrder,f as default};
