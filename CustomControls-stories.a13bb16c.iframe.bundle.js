"use strict";(self.webpackChunkreact_medium_image_zoom=self.webpackChunkreact_medium_image_zoom||[]).push([[24],{"./stories/CustomControls.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{JAndKZoomUnzoom:()=>JAndKZoomUnzoom,__namedExportsOrder:()=>__namedExportsOrder,default:()=>__WEBPACK_DEFAULT_EXPORT__});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),_source__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./source/Controlled.tsx"),_images__WEBPACK_IMPORTED_MODULE_4__=(__webpack_require__("./source/styles.css"),__webpack_require__("./stories/base.css"),__webpack_require__("./stories/images/index.ts"));function _array_like_to_array(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _define_property(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}function _object_spread_props(target,source){return source=null!=source?source:{},Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))})),target}function _sliced_to_array(arr,i){return function _array_with_holes(arr){if(Array.isArray(arr))return arr}(arr)||function _iterable_to_array_limit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_arr=[],_n=!0,_d=!1;try{for(_i=_i.call(arr);!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupported_iterable_to_array(o,minLen){if(!o)return;if("string"==typeof o)return _array_like_to_array(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _array_like_to_array(o,minLen)}(arr,i)||function _non_iterable_rest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}const __WEBPACK_DEFAULT_EXPORT__={title:"Custom Controls",component:_source__WEBPACK_IMPORTED_MODULE_3__.x};var JAndKZoomUnzoom=function(props){var _useState=_sliced_to_array((0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(!1),2),isZoomed=_useState[0],setIsZoomed=_useState[1],handleKeyDown=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((function(e){"j"===e.key||74===e.keyCode?setIsZoomed(!0):"k"!==e.key&&75!==e.keyCode||setIsZoomed(!1)}),[]);return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){return document.addEventListener("keydown",handleKeyDown),function(){document.removeEventListener("keydown",handleKeyDown)}}),[handleKeyDown]),react__WEBPACK_IMPORTED_MODULE_0__.createElement("main",{"aria-label":"Story"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("h1",null,"Custom zoom and unzoom controls"),react__WEBPACK_IMPORTED_MODULE_0__.createElement("div",{className:"jk mw-600"},react__WEBPACK_IMPORTED_MODULE_0__.createElement("p",null,'Click into this window, then use "j" to zoom and "k" to unzoom'),react__WEBPACK_IMPORTED_MODULE_0__.createElement(_source__WEBPACK_IMPORTED_MODULE_3__.x,_object_spread_props(function _object_spread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{},ownKeys=Object.keys(source);"function"==typeof Object.getOwnPropertySymbols&&(ownKeys=ownKeys.concat(Object.getOwnPropertySymbols(source).filter((function(sym){return Object.getOwnPropertyDescriptor(source,sym).enumerable})))),ownKeys.forEach((function(key){_define_property(target,key,source[key])}))}return target}({},props),{isZoomed,onZoomChange:void 0}),react__WEBPACK_IMPORTED_MODULE_0__.createElement("img",{alt:_images__WEBPACK_IMPORTED_MODULE_4__.Wq.alt,src:_images__WEBPACK_IMPORTED_MODULE_4__.Wq.src,width:"500"}))))};JAndKZoomUnzoom.parameters={...JAndKZoomUnzoom.parameters,docs:{...JAndKZoomUnzoom.parameters?.docs,source:{originalSource:"props => {\n  const [isZoomed, setIsZoomed] = useState(false);\n  const handleKeyDown = useCallback((e: KeyboardEvent) => {\n    if (e.key === 'j' || e.keyCode === 74) {\n      setIsZoomed(true);\n    } else if (e.key === 'k' || e.keyCode === 75) {\n      setIsZoomed(false);\n    }\n  }, []);\n  useEffect(() => {\n    document.addEventListener('keydown', handleKeyDown);\n    return () => {\n      document.removeEventListener('keydown', handleKeyDown);\n    };\n  }, [handleKeyDown]);\n  return <main aria-label=\"Story\">\n      <h1>Custom zoom and unzoom controls</h1>\n      <div className=\"jk mw-600\">\n        <p>\n          Click into this window, then use &quot;j&quot; to zoom and\n          &quot;k&quot; to unzoom\n        </p>\n        <Zoom {...props} isZoomed={isZoomed} onZoomChange={undefined /* do nothing */}>\n          <img alt={imgThatWanakaTree.alt} src={imgThatWanakaTree.src} width=\"500\" />\n        </Zoom>\n      </div>\n    </main>;\n}",...JAndKZoomUnzoom.parameters?.docs?.source}}};const __namedExportsOrder=["JAndKZoomUnzoom"];try{JAndKZoomUnzoom.displayName="JAndKZoomUnzoom",JAndKZoomUnzoom.__docgenInfo={description:"",displayName:"JAndKZoomUnzoom",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["stories/CustomControls.stories.tsx#JAndKZoomUnzoom"]={docgenInfo:JAndKZoomUnzoom.__docgenInfo,name:"JAndKZoomUnzoom",path:"stories/CustomControls.stories.tsx#JAndKZoomUnzoom"})}catch(__react_docgen_typescript_loader_error){}},"./node_modules/css-loader/dist/runtime/api.js":module=>{module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/sourceMaps.js":module=>{module.exports=function(item){var content=item[1],cssMapping=item[3];if(!cssMapping)return content;if("function"==typeof btoa){var base64=btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping)))),data="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64),sourceMapping="/*# ".concat(data," */");return[content].concat([sourceMapping]).join("\n")}return[content].join("\n")}},"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":module=>{var stylesInDOM=[];function getIndexByIdentifier(identifier){for(var result=-1,i=0;i<stylesInDOM.length;i++)if(stylesInDOM[i].identifier===identifier){result=i;break}return result}function modulesToDom(list,options){for(var idCountMap={},identifiers=[],i=0;i<list.length;i++){var item=list[i],id=options.base?item[0]+options.base:item[0],count=idCountMap[id]||0,identifier="".concat(id," ").concat(count);idCountMap[id]=count+1;var indexByIdentifier=getIndexByIdentifier(identifier),obj={css:item[1],media:item[2],sourceMap:item[3],supports:item[4],layer:item[5]};if(-1!==indexByIdentifier)stylesInDOM[indexByIdentifier].references++,stylesInDOM[indexByIdentifier].updater(obj);else{var updater=addElementStyle(obj,options);options.byIndex=i,stylesInDOM.splice(i,0,{identifier,updater,references:1})}identifiers.push(identifier)}return identifiers}function addElementStyle(obj,options){var api=options.domAPI(options);api.update(obj);return function updater(newObj){if(newObj){if(newObj.css===obj.css&&newObj.media===obj.media&&newObj.sourceMap===obj.sourceMap&&newObj.supports===obj.supports&&newObj.layer===obj.layer)return;api.update(obj=newObj)}else api.remove()}}module.exports=function(list,options){var lastIdentifiers=modulesToDom(list=list||[],options=options||{});return function update(newList){newList=newList||[];for(var i=0;i<lastIdentifiers.length;i++){var index=getIndexByIdentifier(lastIdentifiers[i]);stylesInDOM[index].references--}for(var newLastIdentifiers=modulesToDom(newList,options),_i=0;_i<lastIdentifiers.length;_i++){var _index=getIndexByIdentifier(lastIdentifiers[_i]);0===stylesInDOM[_index].references&&(stylesInDOM[_index].updater(),stylesInDOM.splice(_index,1))}lastIdentifiers=newLastIdentifiers}}},"./node_modules/style-loader/dist/runtime/insertBySelector.js":module=>{var memo={};module.exports=function insertBySelector(insert,style){var target=function getTarget(target){if(void 0===memo[target]){var styleTarget=document.querySelector(target);if(window.HTMLIFrameElement&&styleTarget instanceof window.HTMLIFrameElement)try{styleTarget=styleTarget.contentDocument.head}catch(e){styleTarget=null}memo[target]=styleTarget}return memo[target]}(insert);if(!target)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");target.appendChild(style)}},"./node_modules/style-loader/dist/runtime/insertStyleElement.js":module=>{module.exports=function insertStyleElement(options){var element=document.createElement("style");return options.setAttributes(element,options.attributes),options.insert(element,options.options),element}},"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=function setAttributesWithoutAttributes(styleElement){var nonce=__webpack_require__.nc;nonce&&styleElement.setAttribute("nonce",nonce)}},"./node_modules/style-loader/dist/runtime/styleDomAPI.js":module=>{module.exports=function domAPI(options){if("undefined"==typeof document)return{update:function update(){},remove:function remove(){}};var styleElement=options.insertStyleElement(options);return{update:function update(obj){!function apply(styleElement,options,obj){var css="";obj.supports&&(css+="@supports (".concat(obj.supports,") {")),obj.media&&(css+="@media ".concat(obj.media," {"));var needLayer=void 0!==obj.layer;needLayer&&(css+="@layer".concat(obj.layer.length>0?" ".concat(obj.layer):""," {")),css+=obj.css,needLayer&&(css+="}"),obj.media&&(css+="}"),obj.supports&&(css+="}");var sourceMap=obj.sourceMap;sourceMap&&"undefined"!=typeof btoa&&(css+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))))," */")),options.styleTagTransform(css,styleElement,options.options)}(styleElement,options,obj)},remove:function remove(){!function removeStyleElement(styleElement){if(null===styleElement.parentNode)return!1;styleElement.parentNode.removeChild(styleElement)}(styleElement)}}}},"./node_modules/style-loader/dist/runtime/styleTagTransform.js":module=>{module.exports=function styleTagTransform(css,styleElement){if(styleElement.styleSheet)styleElement.styleSheet.cssText=css;else{for(;styleElement.firstChild;)styleElement.removeChild(styleElement.firstChild);styleElement.appendChild(document.createTextNode(css))}}},"./stories/images/index.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Qj:()=>imgEarth,pu:()=>imgGlenorchyLagoon,lc:()=>imgHobbiton,cq:()=>imgHookerValleyTrack,bG:()=>imgKea,gA:()=>imgKeaLarge,K$:()=>imgKeaSmall,Zd:()=>imgNzBeach,Ig:()=>imgNzMap,N9:()=>imgPortWaikato,l5:()=>imgQueenstown,Sc:()=>imgTeAraiPoint,w_:()=>imgTekapo,Wq:()=>imgThatWanakaTree});const earth_large_namespaceObject=__webpack_require__.p+"static/media/earth-large.b1a1ed4f.jpg",glenorchy_lagoon_namespaceObject=__webpack_require__.p+"static/media/glenorchy-lagoon.272d443f.jpg",andres_iga_7XKkJVw1d8c_unsplash_smaller_namespaceObject=__webpack_require__.p+"static/media/andres-iga-7XKkJVw1d8c-unsplash-smaller.737d2ec5.jpg",roell_de_ram_2DM7eOR5iyc_unsplash_smaller_namespaceObject=__webpack_require__.p+"static/media/roell-de-ram-2DM7eOR5iyc-unsplash-smaller.a4e5b402.jpg",pablo_heimplatz_PSF2RhUBORs_unsplash_300w_namespaceObject=__webpack_require__.p+"static/media/pablo-heimplatz-PSF2RhUBORs-unsplash-300w.7d7b6375.jpg",pablo_heimplatz_PSF2RhUBORs_unsplash_smaller_namespaceObject=__webpack_require__.p+"static/media/pablo-heimplatz-PSF2RhUBORs-unsplash-smaller.5a06c8a2.jpg",pablo_heimplatz_PSF2RhUBORs_unsplash_namespaceObject=__webpack_require__.p+"static/media/pablo-heimplatz-PSF2RhUBORs-unsplash.19841566.jpg",rod_long_4dcsLxQxSHY_unsplash_smaller_namespaceObject=__webpack_require__.p+"static/media/rod-long-4dcsLxQxSHY-unsplash-smaller.9eee9731.jpg",petr_vysohlid_9fqwGqGLUxc_unsplash_smaller_namespaceObject=__webpack_require__.p+"static/media/petr-vysohlid-9fqwGqGLUxc-unsplash-smaller.163735c3.jpg",omer_faruk_bekdemir_5BuxuWIJF1Q_unsplash_smaller_namespaceObject=__webpack_require__.p+"static/media/omer-faruk-bekdemir-5BuxuWIJF1Q-unsplash-smaller.e6787204.jpg",douglas_bagg_wRwa3Z6GtRI_unsplash_smaller_namespaceObject=__webpack_require__.p+"static/media/douglas-bagg-wRwa3Z6GtRI-unsplash-smaller.053c764a.jpg",tobias_keller_73F4pKoUkM0_unsplash_smaller_namespaceObject=__webpack_require__.p+"static/media/tobias-keller-73F4pKoUkM0-unsplash-smaller.0831f856.jpg",laura_smetsers_H_TW2CoNtTk_unsplash_smaller_namespaceObject=__webpack_require__.p+"static/media/laura-smetsers-H-TW2CoNtTk-unsplash-smaller.4d1fd239.jpg",nz_map_namespaceObject=__webpack_require__.p+"static/media/nz-map.d56663ce.svg";var imgEarth={alt:"2D map of the Earth",src:earth_large_namespaceObject},imgGlenorchyLagoon={alt:"Glenorchy lagoon, New Zealand by Robert Pearce",src:glenorchy_lagoon_namespaceObject},imgHobbiton={alt:"Hobbiton, Matamata, New Zealand by Andres Iga",src:andres_iga_7XKkJVw1d8c_unsplash_smaller_namespaceObject},imgHookerValleyTrack={alt:"Hooker Valley Track, New Zealand by Roll de Ram",src:roell_de_ram_2DM7eOR5iyc_unsplash_smaller_namespaceObject},imgKeaSmall={alt:"Kea (alpine parrot) in Arthur's Pass, New Zealand by Pablo Heimplatz",src:pablo_heimplatz_PSF2RhUBORs_unsplash_300w_namespaceObject},imgKea={alt:"Kea (alpine parrot) in Arthur's Pass, New Zealand by Pablo Heimplatz",src:pablo_heimplatz_PSF2RhUBORs_unsplash_smaller_namespaceObject},imgKeaLarge={alt:"Kea (alpine parrot) in Arthur's Pass, New Zealand by Pablo Heimplatz",src:pablo_heimplatz_PSF2RhUBORs_unsplash_namespaceObject},imgNzBeach={alt:"New Zealand Beach by Rod Long",src:rod_long_4dcsLxQxSHY_unsplash_smaller_namespaceObject},imgQueenstown={alt:"Queenstown, New Zealand by Omer Faruk",src:omer_faruk_bekdemir_5BuxuWIJF1Q_unsplash_smaller_namespaceObject},imgTeAraiPoint={alt:"Te Arai Point, New Zealand by Douglas Bagg",src:douglas_bagg_wRwa3Z6GtRI_unsplash_smaller_namespaceObject},imgTekapo={alt:"Lake Tekapo, New Zealand by Tobias Keller",src:tobias_keller_73F4pKoUkM0_unsplash_smaller_namespaceObject},imgThatWanakaTree={alt:"That Wanaka Tree, New Zealand by Laura Smetsers",src:laura_smetsers_H_TW2CoNtTk_unsplash_smaller_namespaceObject},imgPortWaikato={alt:"Port Waikato, Tuakau, Auckland, New Zealand by Petr Vysohlid",src:petr_vysohlid_9fqwGqGLUxc_unsplash_smaller_namespaceObject},imgNzMap={alt:"Map of New Zealand",src:nz_map_namespaceObject}}}]);