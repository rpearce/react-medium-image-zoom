import React, { Component } from 'react'
import ImageZoom from '../src'

export default class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isZoomed: false
    }
    this._handleKeyup = this._handleKeyup.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keyup', this._handleKeyup)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this._handleKeyup)
  }

  render() {
    return <Controlled isZoomed={this.state.isZoomed} />
  }

  _handleKeyup(e) {
    switch (e.which) {
      case 74:
        return this.setState({ isZoomed: true })
      case 75:
        return this.setState({ isZoomed: false })
      default:
        return
    }
  }
}

const Controlled = props =>
  <div>
    <h1>Controlled</h1>
    <p>
      If you provide an isZoomed property, then the component can be considered
      to be &quot;controlled,&quot; meaning that the component will control its
      own zoom/unzoom actions.
    </p>
    <p>
      With a controlled component, the consumer (you) are responsible for
      changing the isZoomed state.
    </p>
    <p>
      If you click the image below, you will notice that{' '}
      <em>it does not work</em>. Instead use the <strong>j</strong> key to zoom
      and the <strong>k</strong> key to unzoom. Make sure to click in this area
      first.
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
        isZoomed={props.isZoomed}
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

