(self.webpackChunkreact_medium_image_zoom=self.webpackChunkreact_medium_image_zoom||[]).push([[792],{"./.storybook/preview.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{parameters:()=>parameters});const parameters={options:{showPanel:!1,storySort:{order:["Introduction","Galleries","*","<img>","*","<svg>","*","<picture>","*","<figure>","*","Custom Controls","*"]}},previewTabs:{"storybook/docs/panel":{hidden:!0}}}},"./node_modules/.pnpm/@storybook+instrumenter@8.5.8_storybook@8.5.8_prettier@2.8.8_/node_modules/@storybook/instrumenter/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/@storybook+instrumenter@8.5.8_storybook@8.5.8_prettier@2.8.8_/node_modules/@storybook/instrumenter/dist sync recursive",module.exports=webpackEmptyContext},"./node_modules/.pnpm/@storybook+test@8.5.8_storybook@8.5.8_prettier@2.8.8_/node_modules/@storybook/test/dist sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/@storybook+test@8.5.8_storybook@8.5.8_prettier@2.8.8_/node_modules/@storybook/test/dist sync recursive",module.exports=webpackEmptyContext},"./stories lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/stories(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.mdx)$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./Introduction.mdx":["./stories/Introduction.mdx",889,509]};function webpackAsyncContext(req){if(!__webpack_require__.o(map,req))return Promise.resolve().then((()=>{var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}));var ids=map[req],id=ids[0];return Promise.all(ids.slice(1).map(__webpack_require__.e)).then((()=>__webpack_require__(id)))}webpackAsyncContext.keys=()=>Object.keys(map),webpackAsyncContext.id="./stories lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/stories(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.mdx)$",module.exports=webpackAsyncContext},"./stories lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/stories(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$":(module,__unused_webpack_exports,__webpack_require__)=>{var map={"./CustomControls.stories":["./stories/CustomControls.stories.tsx",756,24],"./CustomControls.stories.tsx":["./stories/CustomControls.stories.tsx",756,24],"./Figure.stories":["./stories/Figure.stories.tsx",756,471],"./Figure.stories.tsx":["./stories/Figure.stories.tsx",756,471],"./Galleries.stories":["./stories/Galleries.stories.tsx",756,983],"./Galleries.stories.tsx":["./stories/Galleries.stories.tsx",756,983],"./Img.stories":["./stories/Img.stories.tsx",756,884],"./Img.stories.tsx":["./stories/Img.stories.tsx",756,884],"./Picture.stories":["./stories/Picture.stories.tsx",756,31],"./Picture.stories.tsx":["./stories/Picture.stories.tsx",756,31],"./SVG.stories":["./stories/SVG.stories.tsx",756,183],"./SVG.stories.tsx":["./stories/SVG.stories.tsx",756,183]};function webpackAsyncContext(req){if(!__webpack_require__.o(map,req))return Promise.resolve().then((()=>{var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}));var ids=map[req],id=ids[0];return Promise.all(ids.slice(1).map(__webpack_require__.e)).then((()=>__webpack_require__(id)))}webpackAsyncContext.keys=()=>Object.keys(map),webpackAsyncContext.id="./stories lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/stories(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$",module.exports=webpackAsyncContext},"./storybook-config-entry.js":(__unused_webpack_module,__unused_webpack___webpack_exports__,__webpack_require__)=>{"use strict";var external_STORYBOOK_MODULE_CHANNELS_=__webpack_require__("storybook/internal/channels"),external_STORYBOOK_MODULE_PREVIEW_API_=__webpack_require__("storybook/internal/preview-api"),external_STORYBOOK_MODULE_GLOBAL_=__webpack_require__("@storybook/global");const importers=[async path=>{if(!/^\.[\\/](?:stories(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.mdx)$/.exec(path))return;const pathRemainder=path.substring(10);return __webpack_require__("./stories lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/stories(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.mdx)$")("./"+pathRemainder)},async path=>{if(!/^\.[\\/](?:stories(?:\/(?!\.)(?:(?:(?!(?:^|\/)\.).)*?)\/|\/|$)(?!\.)(?=.)[^/]*?\.stories\.(js|jsx|ts|tsx))$/.exec(path))return;const pathRemainder=path.substring(10);return __webpack_require__("./stories lazy recursive ^\\.\\/.*$ include: (?%21.*node_modules)(?:\\/stories(?:\\/(?%21\\.)(?:(?:(?%21(?:^%7C\\/)\\.).)*?)\\/%7C\\/%7C$)(?%21\\.)(?=.)[^/]*?\\.stories\\.(js%7Cjsx%7Cts%7Ctsx))$")("./"+pathRemainder)}];const channel=(0,external_STORYBOOK_MODULE_CHANNELS_.createBrowserChannel)({page:"preview"});external_STORYBOOK_MODULE_PREVIEW_API_.addons.setChannel(channel),"DEVELOPMENT"===external_STORYBOOK_MODULE_GLOBAL_.global.CONFIG_TYPE&&(window.__STORYBOOK_SERVER_CHANNEL__=channel);const preview=new external_STORYBOOK_MODULE_PREVIEW_API_.PreviewWeb((async function importFn(path){for(let i=0;i<importers.length;i++){const moduleExports=await(x=()=>importers[i](path),x());if(moduleExports)return moduleExports}var x}),(()=>(0,external_STORYBOOK_MODULE_PREVIEW_API_.composeConfigs)([__webpack_require__("./node_modules/.pnpm/@storybook+react@8.5.8_@storybook+test@8.5.8_storybook@8.5.8_prettier@2.8.8___react-dom_a69429f95dcdcbaf664d93e783a42e5b/node_modules/@storybook/react/dist/entry-preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+react@8.5.8_@storybook+test@8.5.8_storybook@8.5.8_prettier@2.8.8___react-dom_a69429f95dcdcbaf664d93e783a42e5b/node_modules/@storybook/react/dist/entry-preview-docs.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-viewport@8.5.8_storybook@8.5.8_prettier@2.8.8_/node_modules/@storybook/addon-viewport/dist/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-docs@8.5.8_@types+react@19.0.10_storybook@8.5.8_prettier@2.8.8_/node_modules/@storybook/addon-docs/dist/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-interactions@8.5.8_storybook@8.5.8_prettier@2.8.8_/node_modules/@storybook/addon-interactions/dist/preview.mjs"),__webpack_require__("./node_modules/.pnpm/@storybook+addon-a11y@8.5.8_storybook@8.5.8_prettier@2.8.8_/node_modules/@storybook/addon-a11y/dist/preview.mjs"),__webpack_require__("./.storybook/preview.ts")])));window.__STORYBOOK_PREVIEW__=preview,window.__STORYBOOK_STORY_STORE__=preview.storyStore,window.__STORYBOOK_ADDONS_CHANNEL__=channel},"@storybook/core/preview-errors":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__},"@storybook/global":module=>{"use strict";module.exports=__STORYBOOK_MODULE_GLOBAL__},"storybook/internal/channels":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CHANNELS__},"storybook/internal/client-logger":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CLIENT_LOGGER__},"storybook/internal/core-events":module=>{"use strict";module.exports=__STORYBOOK_MODULE_CORE_EVENTS__},"storybook/internal/preview-api":module=>{"use strict";module.exports=__STORYBOOK_MODULE_PREVIEW_API__}},__webpack_require__=>{__webpack_require__.O(0,[158],(()=>{return moduleId="./storybook-config-entry.js",__webpack_require__(__webpack_require__.s=moduleId);var moduleId}));__webpack_require__.O()}]);