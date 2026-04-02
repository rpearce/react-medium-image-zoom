import{R as e}from"./iframe-DWUROAE-.js";import"./styles-Bo4Kkt42.js";/* empty css             */import{i as f,a as v,b as E,c as S,d as k,e as h,f as j,g as w,h as P}from"./index-CQ5SO9GX.js";import{U as d}from"./Uncontrolled-r8gvFCD4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Cw3GsTJk.js";import"./index-4uOuXS_E.js";const G={title:"Galleries",component:d},B=["contain","cover","fill","none","scale-down"];function R(n){return B.includes(n)}const s=()=>{const n=[f,v,E,S,k,h,j,w,P],[l,g]=e.useState("cover"),[r,u]=e.useState("50% 50%"),m=e.useCallback(a=>{a.preventDefault();const i=new FormData(a.currentTarget),t=i.get("objectFit"),o=i.get("objectPosition");typeof t=="string"&&R(t)&&g(t),typeof o=="string"&&u(o)},[]);return e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Image gallery using <img />, object-fit, & object-position"),e.createElement("form",{style:{marginBottom:"3rem"},onSubmit:m},e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"object-fit:"),e.createElement("select",{defaultValue:l,name:"objectFit"},e.createElement("option",{value:"cover"},"cover"),e.createElement("option",{value:"contain"},"contain"),e.createElement("option",{value:"none"},"none"),e.createElement("option",{value:"scale-down"},"scale-down"),e.createElement("option",{value:"fill"},"fill")))),e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"object-position:"),e.createElement("input",{defaultValue:r,name:"objectPosition",type:"text"}))),e.createElement("button",{type:"submit"},"Apply changes")),e.createElement("ul",{style:{display:"grid",gridTemplateColumns:"2fr 2fr 2fr",gridGap:"2rem",listStyle:"none",margin:0,padding:0},role:"list"},n.map((a,i)=>e.createElement("li",{key:i,role:"listitem"},e.createElement(d,null,e.createElement("img",{alt:a.alt,loading:"lazy",src:a.src,style:{objectFit:l,objectPosition:r,width:"100%"},width:"250",height:"500"}))))))},c=()=>{const n=e.useMemo(()=>[f,v,E,S,k,h,j,w,P],[]),[l,g]=e.useState("cover"),[r,u]=e.useState("50%"),[m,a]=e.useState("56%"),i=e.useCallback(t=>{t.preventDefault();const o=new FormData(t.currentTarget),p=o.get("backgroundSize"),b=o.get("backgroundPosition"),y=o.get("aspectRatio");typeof p=="string"&&g(p),typeof b=="string"&&u(b),typeof y=="string"&&a(y)},[]);return e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Image gallery using <div>s, background images, and padding"),e.createElement("form",{style:{marginBottom:"3rem"},onSubmit:i},e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"background-size:"),e.createElement("input",{defaultValue:l,name:"backgroundSize",type:"text"}))),e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"background-position:"),e.createElement("input",{defaultValue:r,name:"backgroundPosition",type:"text"}))),e.createElement("div",{style:{marginBottom:"1rem"}},e.createElement("label",null,e.createElement("code",null,"aspect ratio:"),e.createElement("select",{defaultValue:m,name:"aspectRatio"},e.createElement("option",{value:"56%"},"16:9"),e.createElement("option",{value:"75%"},"4:3"),e.createElement("option",{value:"33%"},"3:1"),e.createElement("option",{value:"100%"},"1:1")))),e.createElement("button",{type:"submit"},"Apply changes")),e.createElement("ul",{style:{display:"flex",flexWrap:"wrap",listStyle:"none",margin:0,padding:0}},n.map((t,o)=>e.createElement("li",{key:o,style:{margin:"0 1rem 1rem 0",width:"calc(33% - 1rem)"}},e.createElement(d,null,e.createElement("div",{"aria-label":t.alt,role:"img",style:{backgroundColor:"#fff",backgroundImage:`url(${t.src})`,backgroundPosition:r,backgroundRepeat:"no-repeat",backgroundSize:l,height:"0",paddingBottom:m,width:"100%"}}))))))};s.__docgenInfo={description:"",methods:[],displayName:"ImageGallery"};c.__docgenInfo={description:"",methods:[],displayName:"DivImageGallery"};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const images = [imgGlenorchyLagoon, imgThatWanakaTree, imgNzBeach, imgHobbiton, imgHookerValleyTrack, imgQueenstown, imgTekapo, imgPortWaikato, imgKea];
  const [objectFit, setObjectFit] = React.useState<ObjectFit>('cover');
  const [objectPosition, setObjectPosition] = React.useState('50% 50%');
  const handleSubmit = React.useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newObjectFit = data.get('objectFit');
    const newObjectPosition = data.get('objectPosition');
    if (typeof newObjectFit === 'string' && isObjectFit(newObjectFit)) {
      setObjectFit(newObjectFit);
    }
    if (typeof newObjectPosition === 'string') {
      setObjectPosition(newObjectPosition);
    }
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
      <ul /* eslint-disable-line jsx-a11y/no-redundant-roles -- role="list" restores VoiceOver semantics removed by list-style:none */ style={{
      display: 'grid',
      gridTemplateColumns: '2fr 2fr 2fr',
      gridGap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    }} role="list">
        {images.map((img, i) => <li /* eslint-disable-line jsx-a11y/no-redundant-roles -- role="listitem" restores VoiceOver semantics */ key={i} role="listitem">
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
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const images = React.useMemo(() => [imgGlenorchyLagoon, imgThatWanakaTree, imgNzBeach, imgHobbiton, imgHookerValleyTrack, imgQueenstown, imgTekapo, imgPortWaikato, imgKea], []);
  const [bgSize, setBgSize] = React.useState('cover');
  const [bgPosition, setBgPosition] = React.useState('50%');
  const [aspectRatio, setAspectRatio] = React.useState('56%');
  const handleSubmit = React.useCallback((e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newBgSize = data.get('backgroundSize');
    const newBgPosition = data.get('backgroundPosition');
    const newAspectRatio = data.get('aspectRatio');
    if (typeof newBgSize === 'string') {
      setBgSize(newBgSize);
    }
    if (typeof newBgPosition === 'string') {
      setBgPosition(newBgPosition);
    }
    if (typeof newAspectRatio === 'string') {
      setAspectRatio(newAspectRatio);
    }
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
}`,...c.parameters?.docs?.source}}};const D=["ImageGallery","DivImageGallery"];export{c as DivImageGallery,s as ImageGallery,D as __namedExportsOrder,G as default};
