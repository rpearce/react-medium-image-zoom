import React, { Component } from 'react'
import ImageZoom from '../src'

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEnabled: false
    }
  }

  render() {
    return (
      <ShouldHandleZoom
        isEnabled={this.state.isEnabled}
        onToggle={() => this.setState({ isEnabled: !this.state.isEnabled })}
      />
    )
  }
}

const ShouldHandleZoom = ({ isEnabled, onToggle }) =>
  <div>
    <h1>Conditionally allow/disallow zoom capability</h1>
    <p>
      There are instances where you might want to conditionally enable or
      disable the ability to zoom an image. You can do so with the
      shouldHandleZoom prop which should be a function that returns a boolean.
    </p>
    <p>
      Try it! Click this checkbox to enable zooming and uncheck it to disable
      the zoom capabilities.
    </p>
    <p>
      <input
        type="checkbox"
        value={isEnabled}
        checked={isEnabled}
        onChange={onToggle}
        id="enable"
      />
      <label htmlFor="enable">Enable Zoom</label>
    </p>
    <hr />
    <p>
      Trust fund seitan chia, wolf lomo letterpress Bushwick before they sold
      out. Carles kogi fixie, squid twee Tonx readymade cred typewriter
      scenester locavore kale chips vegan organic. Meggings pug wolf Shoreditch
      typewriter skateboard. McSweeney&apos;s iPhone chillwave, food truck
      direct trade disrupt flannel irony tousled Cosby sweater single-origin
      coffee. Organic disrupt bicycle rights, tattooed messenger bag flannel
      craft beer fashion axe bitters. Readymade sartorial craft beer, quinoa
      sustainable butcher Marfa Echo Park Terry Richardson gluten-free flannel
      retro cred mlkshk banjo. Salvia 90&apos;s art party Blue Bottle, PBR&amp;B
      cardigan 8-bit.
    </p>
    <p>
      <ImageZoom
        image={{
          src: 'https://rpearce.github.io/react-medium-image-zoom/bridge.jpg',
          alt: 'Golden Gate Bridge',
          style: {
            width: '300px'
          }
        }}
        shouldHandleZoom={() => isEnabled}
      />
    </p>
    <p>
      Meggings irony fashion axe, tattooed master cleanse Blue Bottle stumptown
      bitters authentic flannel freegan paleo letterpress ugh sriracha. Wolf
      PBR&amp;B art party aesthetic meh cliche. Sartorial before they sold out
      deep v, aesthetic PBR&amp;B craft beer post-ironic synth keytar pork belly
      skateboard pour-over. Tonx cray pug Etsy, gastropub ennui wolf ethnic Odd
      Future viral master cleanse skateboard banjo. Pitchfork scenester
      cornhole, whatever try-hard ethnic banjo +1 gastropub American Apparel
      vinyl skateboard Shoreditch seitan. Blue Bottle keffiyeh Austin Helvetica
      art party. Portland ethnic fixie, beard retro direct trade ugh scenester
      Tumblr readymade authentic plaid pickled hashtag biodiesel.
    </p>
    <p>
      Scenester chambray slow-carb, trust fund biodiesel ugh bicycle rights
      cornhole. Gentrify messenger bag Truffaut tousled roof party pork belly
      leggings, photo booth jean shorts. Austin readymade PBR plaid chambray.
      Squid Echo Park pour-over, wayfarers forage whatever locavore typewriter
      artisan deep v four loko. Locavore occupy Neutra Pitchfork
      McSweeney&apos;s, wayfarers fingerstache. Actually asymmetrical drinking
      vinegar yr brunch biodiesel. Before they sold out sustainable readymade
      craft beer Portland gastropub squid Austin, roof party Thundercats
      chambray narwhal Bushwick pug.
    </p>
    <p>
      Scenester chambray slow-carb, trust fund biodiesel ugh bicycle rights
      cornhole. Gentrify messenger bag Truffaut tousled roof party pork belly
      leggings, photo booth jean shorts. Austin readymade PBR plaid chambray.
      Squid Echo Park pour-over, wayfarers forage whatever locavore typewriter
      artisan deep v four loko. Locavore occupy Neutra Pitchfork
      McSweeney&apos;s, wayfarers fingerstache. Actually asymmetrical drinking
      vinegar yr brunch biodiesel. Before they sold out sustainable readymade
      craft beer Portland gastropub squid Austin, roof party Thundercats
      chambray narwhal Bushwick pug.
    </p>
  </div>

