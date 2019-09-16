/* eslint react/prop-types: 0 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { withA11y } from '@storybook/addon-a11y'
import { withKnobs } from '@storybook/addon-knobs'
import './.storybook/base.css'
import Zoom from './dist/index.esm'
import nzBeach from './static/rod-long-4dcsLxQxSHY-unsplash.jpg'

const imgNZ = { alt: 'New Zealand Beach', src: nzBeach }

const stories = storiesOf('react-medium-image-zoom', module)

stories.addDecorator(withA11y)
stories.addDecorator(withKnobs)

stories.add('with defaults', () => (
  <ImgStory>
    <img src={imgNZ.src} alt={imgNZ.alt} width="500" />
  </ImgStory>
))

const ImgStory = props => {
  return (
    <div>
      <h1>react-medium-image-zoom</h1>
      <section>
        <p>
          Trust fund seitan chia, wolf lomo letterpress Bushwick before they
          sold out. Carles kogi fixie, squid twee Tonx readymade cred typewriter
          scenester locavore kale chips vegan organic. Meggings pug wolf
          Shoreditch typewriter skateboard. McSweeney&apos;s iPhone chillwave,
          food truck direct trade disrupt flannel irony tousled Cosby sweater
          single-origin coffee. Organic disrupt bicycle rights, tattooed
          messenger bag flannel craft beer fashion axe bitters. Readymade
          sartorial craft beer, quinoa sustainable butcher Marfa Echo Park Terry
          Richardson gluten-free flannel retro cred mlkshk banjo. Salvia
          90&apos;s art party Blue Bottle, PBR&B cardigan 8-bit.
        </p>
        <p>
          Meggings irony fashion axe, tattooed master cleanse Blue Bottle
          stumptown bitters authentic flannel freegan paleo letterpress ugh
          sriracha. Wolf PBR&B art party aesthetic meh cliche. Sartorial before
          they sold out deep v, aesthetic PBR&B craft beer post-ironic synth
          keytar pork belly skateboard pour-over. Tonx cray pug Etsy, gastropub
          ennui wolf ethnic Odd Future viral master cleanse skateboard banjo.
          Pitchfork scenester cornhole, whatever try-hard ethnic banjo +1
          gastropub American Apparel vinyl skateboard Shoreditch seitan. Blue
          Bottle keffiyeh Austin Helvetica art party. Portland ethnic fixie,
          beard retro direct trade ugh scenester Tumblr readymade authentic
          plaid pickled hashtag biodiesel.
        </p>
        <Zoom {...props} />
        <p>
          Thundercats freegan Truffaut, four loko twee Austin scenester lo-fi
          seitan High Life paleo quinoa cray. Schlitz butcher ethical Tumblr,
          pop-up DIY keytar ethnic iPhone PBR sriracha. Tonx direct trade
          bicycle rights gluten-free flexitarian asymmetrical. Whatever drinking
          vinegar PBR XOXO Bushwick gentrify. Cliche semiotics banjo retro squid
          Wes Anderson. Fashion axe dreamcatcher you probably haven&apos;t heard
          of them bicycle rights. Tote bag organic four loko ethical selfies
          gastropub, PBR fingerstache tattooed bicycle rights.
        </p>
        <p>
          Ugh Portland Austin, distillery tattooed typewriter polaroid pug
          Banksy Neutra keffiyeh. Shoreditch mixtape wolf PBR&B, tote bag
          dreamcatcher literally bespoke Odd Future selfies 90&apos;s master
          cleanse vegan. Flannel tofu deep v next level pickled, authentic Etsy
          Shoreditch literally swag photo booth iPhone pug semiotics banjo.
          Bicycle rights butcher Blue Bottle, actually DIY semiotics Banksy
          banjo mixtape Austin pork belly post-ironic. American Apparel
          gastropub hashtag, McSweeney&apos;s master cleanse occupy High Life
          bitters wayfarers next level bicycle rights. Wolf chia Terry
          Richardson, pop-up plaid kitsch ugh. Butcher +1 Carles, swag selfies
          Blue Bottle viral.
        </p>
      </section>
    </div>
  )
}
