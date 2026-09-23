import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{f as n}from"./iframe-BnGksIvQ.js";import{n as r,r as i}from"./styles--txt-lnK.js";import"./base-2zBuyiUy.js";import{h as a,m as o}from"./images-DRsPcGRj.js";var s,c,l,u;function d(){return(d=t((()=>{s=e(n(),1),i(),a(),c={title:`Custom Controls`,component:r},l=e=>{let[t,n]=s.useState(!1),i=s.useCallback(e=>{e.key===`j`?n(!0):e.key===`k`&&n(!1)},[]);return s.useEffect(()=>(document.addEventListener(`keydown`,i),()=>{document.removeEventListener(`keydown`,i)}),[i]),s.createElement(`main`,{"aria-label":`Story`},s.createElement(`h1`,null,`Custom zoom and unzoom controls`),s.createElement(`div`,{className:`jk mw-600`},s.createElement(`p`,null,`Click into this window, then use "j" to zoom and "k" to unzoom`),s.createElement(r,{...e,isZoomed:t,onZoomChange:void 0},s.createElement(`img`,{alt:o.alt,src:o.src,width:`500`}))))},l.__docgenInfo={description:``,methods:[],displayName:`JAndKZoomUnzoom`},u=[`JAndKZoomUnzoom`],l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`props => {
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
}`,...l.parameters?.docs?.source}}}})))()}d();export{l as JAndKZoomUnzoom,u as __namedExportsOrder,c as default};