import{R as e}from"./iframe-D7ws7MYe.js";import"./styles-DtcuyEim.js";/* empty css             */import{a as i,n as m}from"./index-CQ5SO9GX.js";import{U as l}from"./uncontrolled-DPEz1SK4.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Y3N_nmgz.js";import"./index-CiudEeNI.js";const u={title:"CSS Transform",component:l},r=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Mirrored image with ",e.createElement("code",null,"transform: scaleX(-1)")),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"The zoomed image should appear mirrored horizontally, matching the original."),e.createElement(l,{...a},e.createElement("img",{alt:i.alt,src:i.src,height:"320",style:{transform:"scaleX(-1)"},decoding:"async",loading:"lazy"})))),o=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Mirrored image with ",e.createElement("code",null,"transform: scaleY(-1)")),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"The zoomed image should appear mirrored vertically, matching the original."),e.createElement(l,{...a},e.createElement("img",{alt:m.alt,src:m.src,height:"320",style:{transform:"scaleY(-1)"},decoding:"async",loading:"lazy"})))),t=a=>e.createElement("main",{"aria-label":"Story"},e.createElement("h1",null,"Mirrored image with ",e.createElement("code",null,"transform: scale(-1, -1)")),e.createElement("div",{className:"mw-600"},e.createElement("p",null,"The zoomed image should appear mirrored both horizontally and vertically, matching the original."),e.createElement(l,{...a},e.createElement("img",{alt:i.alt,src:i.src,height:"320",style:{transform:"scale(-1, -1)"},decoding:"async",loading:"lazy"}))));r.__docgenInfo={description:"",methods:[],displayName:"MirrorHorizontal"};o.__docgenInfo={description:"",methods:[],displayName:"MirrorVertical"};t.__docgenInfo={description:"",methods:[],displayName:"MirrorBoth"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>
      Mirrored image with <code>transform: scaleX(-1)</code>
    </h1>
    <div className="mw-600">
      <p>
        The zoomed image should appear mirrored horizontally, matching the
        original.
      </p>
      <Zoom {...props}>
        <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" style={{
        transform: 'scaleX(-1)'
      }} decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>
      Mirrored image with <code>transform: scaleY(-1)</code>
    </h1>
    <div className="mw-600">
      <p>
        The zoomed image should appear mirrored vertically, matching the
        original.
      </p>
      <Zoom {...props}>
        <img alt={imgTeAraiPoint.alt} src={imgTeAraiPoint.src} height="320" style={{
        transform: 'scaleY(-1)'
      }} decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...o.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`props => <main aria-label="Story">
    <h1>
      Mirrored image with <code>transform: scale(-1, -1)</code>
    </h1>
    <div className="mw-600">
      <p>
        The zoomed image should appear mirrored both horizontally and
        vertically, matching the original.
      </p>
      <Zoom {...props}>
        <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} height="320" style={{
        transform: 'scale(-1, -1)'
      }} decoding="async" loading="lazy" />
      </Zoom>
    </div>
  </main>`,...t.parameters?.docs?.source}}};const E=["MirrorHorizontal","MirrorVertical","MirrorBoth"];export{t as MirrorBoth,r as MirrorHorizontal,o as MirrorVertical,E as __namedExportsOrder,u as default};
