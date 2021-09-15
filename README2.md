# react-medium-image-zoom

<!--This library is a [`React.js`](https://reactjs.org/) implementation of-->
<!--[Medium.com's image-->
<!--zoom](https://medium.com/design/image-zoom-on-medium-24d146fc0c20) that allows-->
<!--for images to work together for a “zooming” effect and works regardless of-->
<!--parent elements that have `overflow: hidden` or-->
<!--[parents with transform properties](https://codepen.io/rpearce/pen/MEyOmb).-->

<!--* [Installation](#installation)-->
<!--* [Basic Usage](#basic-usage)-->
<!--* [API](#api)-->
<!--* [Contributors](#contributors)-->
<!--* [Storybook Examples](https://rpearce.github.io/image-zoom/)-->
<!--* [Changelog](./CHANGELOG.md)-->
<!--* [Contributing](./CONTRIBUTING.md)-->
<!--* [Code of Conduct](./CODE_OF_CONDUCT.md)-->

<!--## Basic Usage-->

<!--### Uncontrolled component (default)-->
<!--Import the component and the CSS, wrap whatever you want to be "zoomable" with-->
<!--this component, and the component will handle it's own state:-->

<!--```js-->
<!--import React from 'react'-->
<!--import Zoom from 'react-medium-image-zoom'-->
<!--import 'react-medium-image-zoom/dist/styles.css'-->

<!--const MyComponent = () => (-->
<!--  <Zoom>-->
<!--    <img-->
<!--      alt="that wanaka tree"-->
<!--      src="/path/to/thatwanakatree.jpg"-->
<!--      width="500"-->
<!--    />-->
<!--  </Zoom>-->
<!--)-->

<!--export default MyComponent-->
<!--```-->

<!--## Installation-->
<!--```bash-->
<!--npm i react-medium-image-zoom-->
<!--```-->
<!--or-->
<!--```bash-->
<!--yarn add react-medium-image-zoom-->
<!--```-->
<!--or-->
<!--```html-->
<!--[> this build only needs React to be already present <]-->
<!--<script src="https://unpkg.com/react-medium-image-zoom"></script>-->
<!--```-->

<!--## Development-->

<!--### Docker-->

<!--With docker compose:-->

<!--```sh-->
<!--docker compose build-->
<!--docker compose up-->
<!--open localhost:6006-->
<!--```-->

<!--Without docker compose:-->

<!--```sh-->
<!--docker build . -t rpearce/rmiz-->
<!--docker run -p 6006:6006 -d rpearce/rmiz-->
<!--open localhost:6006-->
<!--```-->
