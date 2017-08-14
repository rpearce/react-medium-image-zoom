import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ImageZoom from '../../lib/react-medium-image-zoom'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { firstActive: false }
  }

  componentDidMount() {
    /**
     * This is an example demonstrating how to manually
     * control the `isZoomed` state of the first image
     * using the `j` and `k` keys
     */
    document.addEventListener('keyup', this.handleKeyup.bind(this))
  }

  handleKeyup(e) {
    switch (e.keyCode) {
      case 74:
        return this.setState({ firstActive: true })

      case 75:
        return this.setState({ firstActive: false })

      default:
        return
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Image Zoom</h1>
        <p>Trust fund seitan chia, wolf lomo letterpress Bushwick before they sold out. Carles kogi fixie, squid twee Tonx readymade cred typewriter scenester locavore kale chips vegan organic. Meggings pug wolf Shoreditch typewriter skateboard. McSweeney's iPhone chillwave, food truck direct trade disrupt flannel irony tousled Cosby sweater single-origin coffee. Organic disrupt bicycle rights, tattooed messenger bag flannel craft beer fashion axe bitters. Readymade sartorial craft beer, quinoa sustainable butcher Marfa Echo Park Terry Richardson gluten-free flannel retro cred mlkshk banjo. Salvia 90's art party Blue Bottle, PBR&amp;B cardigan 8-bit.</p>
        <p>Meggings irony fashion axe, tattooed master cleanse Blue Bottle stumptown bitters authentic flannel freegan paleo letterpress ugh sriracha. Wolf PBR&amp;B art party aesthetic meh cliche. Sartorial before they sold out deep v, aesthetic PBR&amp;B craft beer post-ironic synth keytar pork belly skateboard pour-over. Tonx cray pug Etsy, gastropub ennui wolf ethnic Odd Future viral master cleanse skateboard banjo. Pitchfork scenester cornhole, whatever try-hard ethnic banjo +1 gastropub American Apparel vinyl skateboard Shoreditch seitan. Blue Bottle keffiyeh Austin Helvetica art party. Portland ethnic fixie, beard retro direct trade ugh scenester Tumblr readymade authentic plaid pickled hashtag biodiesel.</p>
        <div>
          <ImageZoom
            image={{
              src: 'bridge.jpg',
              alt: 'Golden Gate Bridge',
              className: 'img'
            }}
            zoomImage={{
              src: 'bridge-big.jpg',
              alt: 'Golden Gate Bridge',
              className: 'img--zoomed'
            }}
            isZoomed={ this.state.firstActive }
          />
        </div>
        <p>Thundercats freegan Truffaut, four loko twee Austin scenester lo-fi seitan High Life paleo quinoa cray. Schlitz butcher ethical Tumblr, pop-up DIY keytar ethnic iPhone PBR sriracha. Tonx direct trade bicycle rights gluten-free flexitarian asymmetrical. Whatever drinking vinegar PBR XOXO Bushwick gentrify. Cliche semiotics banjo retro squid Wes Anderson. Fashion axe dreamcatcher you probably haven't heard of them bicycle rights. Tote bag organic four loko ethical selfies gastropub, PBR fingerstache tattooed bicycle rights.</p>
        <div style={{ float: 'left', margin: '0 1.5em 0 0' }}>
          <ImageZoom
            image={{
              src: 'nz.jpg',
              alt: 'Picture of Mt. Cook in New Zealand',
              className: 'img',
              style: {
                width: '20em'
              }
            }}
            zoomImage={{
              src: 'nz-big.jpg',
              alt: 'Picture of Mt. Cook in New Zealand',
              className: 'img--zoomed'
            }}
          />
        </div>
        <p>Ugh Portland Austin, distillery tattooed typewriter polaroid pug Banksy Neutra keffiyeh. Shoreditch mixtape wolf PBR&amp;B, tote bag dreamcatcher literally bespoke Odd Future selfies 90's master cleanse vegan. Flannel tofu deep v next level pickled, authentic Etsy Shoreditch literally swag photo booth iPhone pug semiotics banjo. Bicycle rights butcher Blue Bottle, actually DIY semiotics Banksy banjo mixtape Austin pork belly post-ironic. American Apparel gastropub hashtag, McSweeney's master cleanse occupy High Life bitters wayfarers next level bicycle rights. Wolf chia Terry Richardson, pop-up plaid kitsch ugh. Butcher +1 Carles, swag selfies Blue Bottle viral.</p>
        <p>Keffiyeh food truck organic letterpress leggings iPhone four loko hella pour-over occupy, Wes Anderson cray post-ironic. Neutra retro fixie gastropub +1, High Life semiotics. Vinyl distillery Etsy freegan flexitarian cliche jean shorts, Schlitz wayfarers skateboard tousled irony locavore XOXO meh. Ethnic Wes Anderson McSweeney's messenger bag, mixtape XOXO slow-carb cornhole aesthetic Marfa banjo Thundercats bitters. Raw denim banjo typewriter cray Tumblr, High Life single-origin coffee. 90's Tumblr cred, Terry Richardson occupy raw denim tofu fashion axe photo booth banh mi. Trust fund locavore Helvetica, fashion axe selvage authentic Shoreditch swag selfies stumptown +1.</p>
        <div>
          <ImageZoom
            image={{
              src: 'gazelle.jpg',
              alt: 'Gazelle Stomping',
              title: "Don't exceed original image dimensions...",
              className: 'img',
              style: {
                width: '80%'
              }
            }}
            shouldRespectMaxDimension={ true }
          />
        </div>
        <p>Scenester chambray slow-carb, trust fund biodiesel ugh bicycle rights cornhole. Gentrify messenger bag Truffaut tousled roof party pork belly leggings, photo booth jean shorts. Austin readymade PBR plaid chambray. Squid Echo Park pour-over, wayfarers forage whatever locavore typewriter artisan deep v four loko. Locavore occupy Neutra Pitchfork McSweeney's, wayfarers fingerstache. Actually asymmetrical drinking vinegar yr brunch biodiesel. Before they sold out sustainable readymade craft beer Portland gastropub squid Austin, roof party Thundercats chambray narwhal Bushwick pug.</p>
        <p>Literally typewriter chillwave, bicycle rights Carles flannel wayfarers. Biodiesel farm-to-table actually, locavore keffiyeh hella shabby chic pour-over try-hard Bushwick. Sriracha American Apparel Brooklyn, synth cray stumptown blog Bushwick +1 VHS hashtag. Wolf umami Carles Marfa, 90's food truck Cosby sweater. Fanny pack try-hard keytar pop-up readymade, master cleanse four loko trust fund polaroid salvia. Photo booth kitsch forage chambray, Carles scenester slow-carb lomo cardigan dreamcatcher. Swag asymmetrical leggings, biodiesel Tonx shabby chic ethnic master cleanse freegan.</p>
        <p>Raw denim Banksy shabby chic, 8-bit salvia narwhal fashion axe. Ethical Williamsburg four loko, chia kale chips distillery Shoreditch messenger bag swag iPhone Pitchfork. Viral PBR&amp;B single-origin coffee quinoa readymade, ethical chillwave drinking vinegar gluten-free Wes Anderson kitsch Tumblr synth actually bitters. Butcher McSweeney's forage mlkshk kogi fingerstache. Selvage scenester butcher Shoreditch, Carles beard plaid disrupt DIY. Pug readymade selvage retro, Austin salvia vinyl master cleanse flexitarian deep v bicycle rights plaid Terry Richardson mlkshk pour-over. Trust fund try-hard banh mi Brooklyn, 90's Etsy kogi YOLO salvia.</p>
      </div>
    )
  }
}

const container = document.querySelector('[data-app]')
ReactDOM.render(<App />, container)
