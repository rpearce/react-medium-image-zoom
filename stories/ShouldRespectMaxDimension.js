import React from 'react'
import ImageZoom from '../src'

const ShouldRespectMaxDimension = () =>
  <div>
    <h1>Respect image&apos;s max dimension</h1>
    <p>
      When zooming images or scaling them up, there are times when zooming an
      image to larger than its maximum size will make it look blurry and
      therefore ugly. The shouldRespectMaxDimension prop is disabled by default
      (maybe that will change in the future), but if you enable it, then it
      won&apos;t &quot;zoom&quot; the image larger than it&apos;s dimensions.
    </p>
    <p>
      When you click the image below, note how it doesn&apos;t quite get to the
      normal border offset (unless you&apos;re on a smaller screen than a
      Macbook Pro).
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
          src: 'https://rpearce.github.io/react-medium-image-zoom/gazelle.jpg',
          alt: 'Gazelle Stomping',
          title: "Don't exceed original image dimensions...",
          style: {
            width: '200px'
          }
        }}
        shouldRespectMaxDimension={true}
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


export default ShouldRespectMaxDimension
