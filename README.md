# react-medium-image-zoom
[![All Contributors](https://img.shields.io/badge/all_contributors-17-orange.svg?style=flat-square)](#contributors)

[![npm version](https://img.shields.io/npm/v/react-medium-image-zoom.svg)](https://www.npmjs.com/package/react-medium-image-zoom) [![npm downloads](https://img.shields.io/npm/dt/react-medium-image-zoom.svg)](https://www.npmjs.com/package/react-medium-image-zoom)

This library is a different implementation of [Medium.com's image zoom](https://medium.com/design/image-zoom-on-medium-24d146fc0c20) that allows for a low-res and high-res images to work together for “zooming” effects and works regardless of parent elements that have `overflow: hidden` or [parents with transform properties](https://codepen.io/rpearce/pen/MEyOmb). Versions `>=3.0.0` are compatible with [React.js](https://github.com/facebook/react) `>=16.x`; if you need compatibility with `react@^0.14.0 || ^15.0.0`, please use version `2.x`.

You can [view the demo here](https://rpearce.github.io/react-medium-image-zoom/).

![demo](https://user-images.githubusercontent.com/592876/30678463-7ef720f0-9ee6-11e7-925d-924da1b58157.gif)

## Installation
```
$ npm install --save react-medium-image-zoom
```

## Usage
```js
import ImageZoom from 'react-medium-image-zoom'

function MyComponent(props) {
  return (
    <div>
      <p>Some text...</p>

      <ImageZoom
        image={{
          src: 'bridge.jpg',
          alt: 'Golden Gate Bridge',
          className: 'img',
          style: { width: '50em' }
        }}
        zoomImage={{
          src: 'bridge-big.jpg',
          alt: 'Golden Gate Bridge'
        }}
      />

      <p>Some text...</p>
    </div>
  )
}
```

| Prop                          | Type    | Required | Default           | Details |
| ---                           | ---     | ---      | ---               | ---     |
| `image`                       | object  | yes      | none              | The original image |
| `zoomImage`                   | object  | no       | `image`           | The image to be used for zooming |
| `zoomMargin`                  | number  | no       | `40`              | Pixel number to offset zoomed image from the window |
| `isZoomed`                    | boolean | no       | `false`           | For more direct control over the zoom state |
| `shouldHandleZoom`            | func    | no       | `(event) => true` | Pass this callback to intercept a zoom click event and determine whether or not to zoom. Function must return a truthy or falsy value |
| `shouldReplaceImage`          | boolean | no       | `true`            | Once the image has been "zoomed" and downloaded the larger image, this replaces the original `image` with the `zoomImage` |
| `shouldRespectMaxDimension`   | boolean | no       | `false`           | When `true`, don't make the zoomed image's dimensions larger than the original dimensions. Only supported if no `zoomImage` is provided. Will also disable the zooming if the image's is already rendered at its maximum width & height |
| `defaultStyles`               | object  | no       | `{}`              | For fine-grained control over all default styles (`zoomContainer`, `overlay`, `image`, `zoomImage`) |
| `onZoom`                      | func    | no       | `() => {}`        | Pass this callback to respond to a zoom interaction. |
| `onUnzoom`                    | func    | no       | `() => {}`        | Pass this callback to respond to an unzoom interaction. |

Each one of these image props accepts normal `image` props, for example:

| Prop | Type | Required | Details |
| ------ |  ---- | ------- | ------- |
| `src` | string | yes | The source for the image |
| `alt` | string | no | The alt text for the image |
| `className` | string | no | Classes to apply to the image |
| `style` | object | no | Additional styles to apply to the image |
| ... | ... | no | ... |

## Controlled vs Uncontrolled Modes
Similar to how an `<input />` works in React, if the consumer initially chooses to control the `isZoomed` value, then this means the consumer is now responsible for telling the component the value of `isZoomed`. If the consumer instantiates the component with a non-null `isZoomed` value and subsequently does _not_ pass a value for it on updates, then an error will be thrown notifying the consumer that this is a controlled component.

The reverse is true, as well. If the component is instantiated without an `isZoomed` value, then the component will handle its own `isZoomed` state. If a non-null `isZoomed` prop is passed _after_ instantiation, then an error will be thrown notifying the consumer that this component controls its own state.

## Browser Support
Currently, this has only been tested on the latest modern browsers. Pull requests are welcome.

## Development
The source code is located within the `src` directory. Use `$ npm run build` to build the main file as well as the example during development and/or use `$ npm run dev` to have it watch for changes to `src/` and `example/src`.

You can view the built example as a file via `$ open example/build/index.html`, or you can use `$ npm run dev` to start a local dev server and navigate to [http://localhost:3000](http://localhost:3000).

### Storybook
This project's different options and use cases are documented in [storybook](https://github.com/storybooks/storybook). You can use this in dev like so:

* `$ yarn run storybook` (or `$ npm run storybook`)
* navigate to http://localhost:6006

The page should look like this:

![image](https://user-images.githubusercontent.com/592876/30678386-097f05c2-9ee6-11e7-936d-56a12b59d4b8.png)

## Contributing

1. Check out the [issues](https://github.com/rpearce/react-medium-image-zoom/issues)
1. Fork this repository
1. Clone your fork
1. Check out a feature branch (`$ git checkout -b my-feature`)
1. Make your changes
1. Run `$ yarn run build` to compile your changes and build the example
1. Test your example (see the "Development" section above)
1. Push your branch to your GitHub repo
1. Create a pull request from your branch to this repo's `X-0-stable` branch (where `X` is the correct major version you're targeting)
1. When all is merged, pull down the upstream changes to your master
  * `$ git remote add upstream git@github.com:rpearce/react-medium-image-zoom.git`
  * `$ git fetch upstream`
  * `$ git merge upstream/master`
1. Delete your feature branch

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/4642599?v=4" width="100px;"/><br /><sub><b>Cameron Bothner</b></sub>](https://github.com/cbothner)<br />[💻](https://github.com/rpearce/react-medium-image-zoom/commits?author=cbothner "Code") [📖](https://github.com/rpearce/react-medium-image-zoom/commits?author=cbothner "Documentation") [🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Acbothner "Bug reports") [💡](#example-cbothner "Examples") [🤔](#ideas-cbothner "Ideas, Planning, & Feedback") [👀](#review-cbothner "Reviewed Pull Requests") [⚠️](https://github.com/rpearce/react-medium-image-zoom/commits?author=cbothner "Tests") | [<img src="https://avatars2.githubusercontent.com/u/12982155?v=4" width="100px;"/><br /><sub><b>Jeremy Bini</b></sub>](https://github.com/jeremybini)<br />[💻](https://github.com/rpearce/react-medium-image-zoom/commits?author=jeremybini "Code") [🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ajeremybini "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/7355199?v=4" width="100px;"/><br /><sub><b>ismay</b></sub>](https://ismaywolff.nl)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aismay "Bug reports") [🤔](#ideas-ismay "Ideas, Planning, & Feedback") | [<img src="https://avatars0.githubusercontent.com/u/220647?v=4" width="100px;"/><br /><sub><b>Rajit Singh</b></sub>](https://www.qeek.co)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Arajit "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/16122?v=4" width="100px;"/><br /><sub><b>Roberto Saccon</b></sub>](https://github.com/rsaccon)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Arsaccon "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/6598350?v=4" width="100px;"/><br /><sub><b>wtfdaemon</b></sub>](https://github.com/wtfdaemon)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Awtfdaemon "Bug reports") | [<img src="https://avatars2.githubusercontent.com/u/592876?v=4" width="100px;"/><br /><sub><b>Robert Pearce</b></sub>](https://robertwpearce.com)<br />[💻](https://github.com/rpearce/react-medium-image-zoom/commits?author=rpearce "Code") [💬](#question-rpearce "Answering Questions") [⚠️](https://github.com/rpearce/react-medium-image-zoom/commits?author=rpearce "Tests") [🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Arpearce "Bug reports") [💡](#example-rpearce "Examples") [🎨](#design-rpearce "Design") [👀](#review-rpearce "Reviewed Pull Requests") [🤔](#ideas-rpearce "Ideas, Planning, & Feedback") [📖](https://github.com/rpearce/react-medium-image-zoom/commits?author=rpearce "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/606159?v=4" width="100px;"/><br /><sub><b>Josh Sloat</b></sub>](http://www.joshsloat.com)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Ajoshsloat "Bug reports") [💻](https://github.com/rpearce/react-medium-image-zoom/commits?author=joshsloat "Code") [💡](#example-joshsloat "Examples") [👀](#review-joshsloat "Reviewed Pull Requests") [🤔](#ideas-joshsloat "Ideas, Planning, & Feedback") [📖](https://github.com/rpearce/react-medium-image-zoom/commits?author=joshsloat "Documentation") [🎨](#design-joshsloat "Design") [💬](#question-joshsloat "Answering Questions") | [<img src="https://avatars1.githubusercontent.com/u/5960217?v=4" width="100px;"/><br /><sub><b>Aswin</b></sub>](https://github.com/aswinckr)<br />[💬](#question-aswinckr "Answering Questions") | [<img src="https://avatars3.githubusercontent.com/u/1233347?v=4" width="100px;"/><br /><sub><b>Alex Shelkovskiy</b></sub>](https://github.com/alexshelkov)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aalexshelkov "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/7365629?v=4" width="100px;"/><br /><sub><b>Adrian Bindiu</b></sub>](http://adrian-design.com)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3ASnowsoul "Bug reports") | [<img src="https://avatars3.githubusercontent.com/u/110935?v=4" width="100px;"/><br /><sub><b>Kendall Buchanan</b></sub>](https://github.com/kendagriff)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Akendagriff "Bug reports") | [<img src="https://avatars2.githubusercontent.com/u/25674779?v=4" width="100px;"/><br /><sub><b>Kaycee</b></sub>](https://github.com/HippoDippo)<br />[💻](https://github.com/rpearce/react-medium-image-zoom/commits?author=HippoDippo "Code") | [<img src="https://avatars2.githubusercontent.com/u/9633371?v=4" width="100px;"/><br /><sub><b>Anuj</b></sub>](http://shuffle.do)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aoyeanuj "Bug reports") [💬](#question-oyeanuj "Answering Questions") |
| [<img src="https://avatars1.githubusercontent.com/u/10273946?v=4" width="100px;"/><br /><sub><b>Ludwig Frank</b></sub>](https://github.com/ludwigfrank)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aludwigfrank "Bug reports") [💻](https://github.com/rpearce/react-medium-image-zoom/commits?author=ludwigfrank "Code") | [<img src="https://avatars2.githubusercontent.com/u/20569525?v=4" width="100px;"/><br /><sub><b>LX</b></sub>](https://github.com/serfgy)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3Aserfgy "Bug reports") [🤔](#ideas-serfgy "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/5452135?v=4" width="100px;"/><br /><sub><b>Rosen Tomov</b></sub>](http://www.rosentomov.com)<br />[🐛](https://github.com/rpearce/react-medium-image-zoom/issues?q=author%3AbabyPrince "Bug reports") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
