# API Documentation

| Prop | Type | Required | Default  | Details |
| ---  | --- | ---  | --- | --- |
| `` | | | | |

## Installation
```js
$ npm i react-medium-image-zoom
```

## Usage

```js
import ImageZoom from 'react-medium-image-zoom'

export default class App extends Component {
  constructor(...params) {
    super(...params)
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.state = { isOpen: false }
  }

  handleClose() {
    this.setState({ isOpen: false })
  }

  handleOpen() {
    this.setState({ isOpen: true })
  }

  render() {
    const { isOpen } = this.state

    return (
      <ImageZoom
      />
    )
  }
}
```
