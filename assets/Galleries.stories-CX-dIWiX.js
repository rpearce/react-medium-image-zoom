import{R as e}from"./iframe-Cb4FSRzT.js";import"./styles-CwXB_sd0.js";/* empty css             */import{i as p,a as b,b as y,c as v,d as f,e as E,f as k,g as h,h as S}from"./index-CQ5SO9GX.js";import{U as d}from"./Uncontrolled-BfMGgxqX.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DOnd415_.js";import"./index-CFmfdSXI.js";const x={title:"Galleries",component:d},r=()=>{const s=[p,b,y,v,f,E,k,h,S],[o,g]=e.useState("cover"),[i,u]=e.useState("50% 50%"),c=e.useCallback(t=>{t.preventDefault();const a=new FormData(t.currentTarget);g(a.get("objectFit")),u(a.get("objectPosition"))},[]);return e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Image gallery using <img />, object-fit, & object-position"),e.createElement("form",{style:{marginBottom:"3rem"},onSubmit:c},e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"object-fit:"),e.createElement("select",{defaultValue:o,name:"objectFit"},e.createElement("option",{value:"cover"},"cover"),e.createElement("option",{value:"contain"},"contain"),e.createElement("option",{value:"none"},"none"),e.createElement("option",{value:"scale-down"},"scale-down"),e.createElement("option",{value:"fill"},"fill")))),e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"object-position:"),e.createElement("input",{defaultValue:i,name:"objectPosition",type:"text"}))),e.createElement("button",{type:"submit"},"Apply changes")),e.createElement("ul",{style:{display:"grid",gridTemplateColumns:"2fr 2fr 2fr",gridGap:"2rem",listStyle:"none",margin:0,padding:0},role:"list"},s.map((t,a)=>e.createElement("li",{key:a,role:"listitem"},e.createElement(d,null,e.createElement("img",{alt:t.alt,loading:"lazy",src:t.src,style:{objectFit:o,objectPosition:i,width:"100%"},width:"250",height:"500"}))))))},m=()=>{const s=e.useMemo(()=>[p,b,y,v,f,E,k,h,S],[]),[o,g]=e.useState("cover"),[i,u]=e.useState("50%"),[c,t]=e.useState("56%"),a=e.useCallback(n=>{n.preventDefault();const l=new FormData(n.currentTarget);g(l.get("backgroundSize")),u(l.get("backgroundPosition")),t(l.get("aspectRatio"))},[]);return e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Image gallery using <div>s, background images, and padding"),e.createElement("form",{style:{marginBottom:"3rem"},onSubmit:a},e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"background-size:"),e.createElement("input",{defaultValue:o,name:"backgroundSize",type:"text"}))),e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"background-position:"),e.createElement("input",{defaultValue:i,name:"backgroundPosition",type:"text"}))),e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"aspect ratio:"),e.createElement("select",{defaultValue:c,name:"aspectRatio"},e.createElement("option",{value:"56%"},"16:9"),e.createElement("option",{value:"75%"},"4:3"),e.createElement("option",{value:"33%"},"3:1"),e.createElement("option",{value:"100%"},"1:1")))),e.createElement("button",{type:"submit"},"Apply changes")),e.createElement("ul",{style:{display:"flex",flexWrap:"wrap",listStyle:"none",margin:0,padding:0}},s.map((n,l)=>e.createElement("li",{key:l,style:{margin:"0 1rem 1rem 0",width:"calc(33% - 1rem)"}},e.createElement(d,null,e.createElement("div",{"aria-label":n.alt,role:"img",style:{backgroundColor:"#fff",backgroundImage:`url(${n.src})`,backgroundPosition:i,backgroundRepeat:"no-repeat",backgroundSize:o,height:"0",paddingBottom:c,width:"100%"}}))))))};r.__docgenInfo={description:"",methods:[],displayName:"ImageGallery"};m.__docgenInfo={description:"",methods:[],displayName:"DivImageGallery"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const images = [imgGlenorchyLagoon, imgThatWanakaTree, imgNzBeach, imgHobbiton, imgHookerValleyTrack, imgQueenstown, imgTekapo, imgPortWaikato, imgKea];
  const [objectFit, setObjectFit] = React.useState('cover' as ObjectFit);
  const [objectPosition, setObjectPosition] = React.useState('50% 50%');
  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setObjectFit(data.get('objectFit') as ObjectFit);
    setObjectPosition(data.get('objectPosition') as string);
  }, []);
  return <main aria-label="Story">
      <h1>{'Image gallery using <img />, object-fit, & object-position'}</h1>
      <form style={{
      marginBottom: '3rem'
    }} onSubmit={handleSubmit}>
        <div style={{
        marginBottom: '1rem'
      }}>
          <label>
            <code>object-fit:</code>
            <select defaultValue={objectFit} name="objectFit">
              <option value="cover">cover</option>
              <option value="contain">contain</option>
              <option value="none">none</option>
              <option value="scale-down">scale-down</option>
              <option value="fill">fill</option>
            </select>
          </label>
        </div>
        <div style={{
        marginBottom: '1rem'
      }}>
          <label>
            <code>object-position:</code>
            <input defaultValue={objectPosition} name="objectPosition" type="text" />
          </label>
        </div>
        <button type="submit">Apply changes</button>
      </form>
      <ul /* eslint-disable-line jsx-a11y/no-redundant-roles */ style={{
      display: 'grid',
      gridTemplateColumns: '2fr 2fr 2fr',
      gridGap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    }} role="list">
        {images.map((img, i) => <li /* eslint-disable-line jsx-a11y/no-redundant-roles */ key={i} role="listitem">
            <Zoom>
              <img alt={img.alt} loading="lazy" src={img.src} style={{
            objectFit,
            objectPosition,
            width: '100%'
          }} width="250" height="500" />
            </Zoom>
          </li>)}
      </ul>
    </main>;
}`,...r.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const images = React.useMemo(() => [imgGlenorchyLagoon, imgThatWanakaTree, imgNzBeach, imgHobbiton, imgHookerValleyTrack, imgQueenstown, imgTekapo, imgPortWaikato, imgKea], []);
  const [bgSize, setBgSize] = React.useState('cover');
  const [bgPosition, setBgPosition] = React.useState('50%');
  const [aspectRatio, setAspectRatio] = React.useState('56%');
  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setBgSize(data.get('backgroundSize') as string);
    setBgPosition(data.get('backgroundPosition') as string);
    setAspectRatio(data.get('aspectRatio') as string);
  }, []);
  return <main aria-label="Story">
      <h1>{'Image gallery using <div>s, background images, and padding'}</h1>
      <form style={{
      marginBottom: '3rem'
    }} onSubmit={handleSubmit}>
        <div style={{
        marginBottom: '1rem'
      }}>
          <label>
            <code>background-size:</code>
            <input defaultValue={bgSize} name="backgroundSize" type="text" />
          </label>
        </div>
        <div style={{
        marginBottom: '1rem'
      }}>
          <label>
            <code>background-position:</code>
            <input defaultValue={bgPosition} name="backgroundPosition" type="text" />
          </label>
        </div>
        <div style={{
        marginBottom: '1rem'
      }}>
          <label>
            <code>aspect ratio:</code>
            <select defaultValue={aspectRatio} name="aspectRatio">
              <option value="56%">16:9</option>
              <option value="75%">4:3</option>
              <option value="33%">3:1</option>
              <option value="100%">1:1</option>
            </select>
          </label>
        </div>
        <button type="submit">Apply changes</button>
      </form>
      <ul style={{
      display: 'flex',
      flexWrap: 'wrap',
      listStyle: 'none',
      margin: 0,
      padding: 0
    }}>
        {images.map((img, i) => <li key={i} style={{
        margin: '0 1rem 1rem 0',
        width: 'calc(33% - 1rem)'
      }}>
            <Zoom>
              <div aria-label={img.alt} role="img" style={{
            backgroundColor: '#fff',
            backgroundImage: \`url(\${img.src})\`,
            backgroundPosition: bgPosition,
            backgroundRepeat: 'no-repeat',
            backgroundSize: bgSize,
            height: '0',
            paddingBottom: aspectRatio,
            width: '100%'
          }} />
            </Zoom>
          </li>)}
      </ul>
    </main>;
}`,...m.parameters?.docs?.source}}};const I=["ImageGallery","DivImageGallery"];export{m as DivImageGallery,r as ImageGallery,I as __namedExportsOrder,x as default};
