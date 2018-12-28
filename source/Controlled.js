import React, { PureComponent, StrictMode, createRef } from 'react'
import ButtonA11y from 'react-button-a11y'
import uniqueId from '@rpearce/simple-uniqueid'

export class Controlled extends PureComponent {
  constructor(...params) {
    super(...params)
    this.handleClickTrigger = this.handleClickTrigger.bind(this)
    this.ref = createRef()
    this.id = uniqueId('rmiz-')
  }

  componentDidMount() {
    console.log(this.ref.current)
  }

  handleClickTrigger() {
    console.log('clicked trigger')
  }

  render() {
    const {
      children,
      isZoomed,
      label
      //shouldRespectMaxDimension
    } = this.props

    return (
      <StrictMode>
        <ButtonA11y
          aria-controls={this.id}
          aria-expanded={isZoomed}
          aria-haspopup={true}
          aria-label={label}
          aria-owns={this.id}
          onClick={this.handleClickTrigger}
          ref={this.ref}
        >
          {children}
        </ButtonA11y>
      </StrictMode>
    )
  }
}

export default Controlled
