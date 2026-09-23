import{a as e,n as t}from"./rolldown-runtime-DkW27tQK.js";import{f as n}from"./iframe-BnGksIvQ.js";import"./styles--txt-lnK.js";import{n as r,t as i}from"./uncontrolled-B-GH87Rh.js";import"./base-2zBuyiUy.js";import{a,c as o,d as s,h as c,i as l,m as u,n as d,p as f,r as p,u as m}from"./images-DRsPcGRj.js";function h(e){return v.includes(e)}var g,_,v,y,b,x;function S(){return(S=t((()=>{g=e(n(),1),r(),c(),_={title:`Galleries`,component:i},v=[`contain`,`cover`,`fill`,`none`,`scale-down`],y=()=>{let e=[d,u,o,p,l,s,f,m,a],[t,n]=g.useState(`cover`),[r,c]=g.useState(`50% 50%`),_=g.useCallback(e=>{e.preventDefault();let t=new FormData(e.currentTarget),r=t.get(`objectFit`),i=t.get(`objectPosition`);typeof r==`string`&&h(r)&&n(r),typeof i==`string`&&c(i)},[]);return g.createElement(`main`,{"aria-label":`Story`},g.createElement(`h1`,null,`Image gallery using <img />, object-fit, & object-position`),g.createElement(`form`,{style:{marginBottom:`3rem`},onSubmit:_},g.createElement(`div`,{style:{marginBottom:`1rem`}},g.createElement(`label`,null,g.createElement(`code`,null,`object-fit:`),g.createElement(`select`,{defaultValue:t,name:`objectFit`},g.createElement(`option`,{value:`cover`},`cover`),g.createElement(`option`,{value:`contain`},`contain`),g.createElement(`option`,{value:`none`},`none`),g.createElement(`option`,{value:`scale-down`},`scale-down`),g.createElement(`option`,{value:`fill`},`fill`)))),g.createElement(`div`,{style:{marginBottom:`1rem`}},g.createElement(`label`,null,g.createElement(`code`,null,`object-position:`),g.createElement(`input`,{defaultValue:r,name:`objectPosition`,type:`text`}))),g.createElement(`button`,{type:`submit`},`Apply changes`)),g.createElement(`ul`,{style:{display:`grid`,gridTemplateColumns:`2fr 2fr 2fr`,gap:`2rem`,listStyle:`none`,margin:0,padding:0},role:`list`},e.map((e,n)=>g.createElement(`li`,{key:n,role:`listitem`},g.createElement(i,null,g.createElement(`img`,{alt:e.alt,loading:`lazy`,src:e.src,style:{objectFit:t,objectPosition:r,width:`100%`},width:`250`,height:`500`}))))))},b=()=>{let e=g.useMemo(()=>[d,u,o,p,l,s,f,m,a],[]),[t,n]=g.useState(`cover`),[r,c]=g.useState(`50%`),[h,_]=g.useState(`56%`),v=g.useCallback(e=>{e.preventDefault();let t=new FormData(e.currentTarget),r=t.get(`backgroundSize`),i=t.get(`backgroundPosition`),a=t.get(`aspectRatio`);typeof r==`string`&&n(r),typeof i==`string`&&c(i),typeof a==`string`&&_(a)},[]);return g.createElement(`main`,{"aria-label":`Story`},g.createElement(`h1`,null,`Image gallery using <div>s, background images, and padding`),g.createElement(`form`,{style:{marginBottom:`3rem`},onSubmit:v},g.createElement(`div`,{style:{marginBottom:`1rem`}},g.createElement(`label`,null,g.createElement(`code`,null,`background-size:`),g.createElement(`input`,{defaultValue:t,name:`backgroundSize`,type:`text`}))),g.createElement(`div`,{style:{marginBottom:`1rem`}},g.createElement(`label`,null,g.createElement(`code`,null,`background-position:`),g.createElement(`input`,{defaultValue:r,name:`backgroundPosition`,type:`text`}))),g.createElement(`div`,{style:{marginBottom:`1rem`}},g.createElement(`label`,null,g.createElement(`code`,null,`aspect ratio:`),g.createElement(`select`,{defaultValue:h,name:`aspectRatio`},g.createElement(`option`,{value:`56%`},`16:9`),g.createElement(`option`,{value:`75%`},`4:3`),g.createElement(`option`,{value:`33%`},`3:1`),g.createElement(`option`,{value:`100%`},`1:1`)))),g.createElement(`button`,{type:`submit`},`Apply changes`)),g.createElement(`ul`,{style:{display:`flex`,flexWrap:`wrap`,listStyle:`none`,margin:0,padding:0}},e.map((e,n)=>g.createElement(`li`,{key:n,style:{margin:`0 1rem 1rem 0`,width:`calc(33% - 1rem)`}},g.createElement(i,null,g.createElement(`div`,{"aria-label":e.alt,role:`img`,style:{backgroundColor:`#fff`,backgroundImage:`url(${e.src})`,backgroundPosition:r,backgroundRepeat:`no-repeat`,backgroundSize:t,height:`0`,paddingBottom:h,width:`100%`}}))))))},y.__docgenInfo={description:``,methods:[],displayName:`ImageGallery`},b.__docgenInfo={description:``,methods:[],displayName:`DivImageGallery`},x=[`ImageGallery`,`DivImageGallery`],y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
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
      <ul style={{
      display: 'grid',
      gridTemplateColumns: '2fr 2fr 2fr',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    }}
    /* oxlint-disable-next-line jsx-a11y/no-redundant-roles -- role="list" restores VoiceOver semantics removed by list-style:none */ role="list">
        {images.map((img, i) => (/* oxlint-disable-next-line jsx-a11y/no-redundant-roles -- role="listitem" restores VoiceOver semantics */
      <li key={i} role="listitem">
            <Zoom>
              <img alt={img.alt} loading="lazy" src={img.src} style={{
            objectFit,
            objectPosition,
            width: '100%'
          }} width="250" height="500" />
            </Zoom>
          </li>))}
      </ul>
    </main>;
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
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
}`,...b.parameters?.docs?.source}}}})))()}S();export{b as DivImageGallery,y as ImageGallery,x as __namedExportsOrder,_ as default};