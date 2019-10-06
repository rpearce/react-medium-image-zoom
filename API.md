# API Documentation

| Prop | Type | Required | Default  | Details |
| ---  | --- | ---  | --- | --- |
| `` | | | | |

## Installation
```js
$ npm i react-medium-image-zoom
```
or
```js
$ yarn add react-medium-image-zoom
```

## Usage

```js
import React, { useState } from 'react'
import Img from 'react-medium-image-zoom'

const MyComponent = () => {
  const [isActive, setActive] = useState(false)
  const handleClose = useCallback(() => { setActive(false) }, [setActive])
  const handleOpen = useCallback(() => { setActive(true) }, [setActive])

  return (
    <Img
      handleClose={handleClose}
      handleOpen={handleOpen}
      isActive={isActive}
    />
  )
}

export default MyComponent
```
