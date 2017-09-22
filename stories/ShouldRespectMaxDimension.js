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
    <p>
      Note: if an image is already at its maximum width &amp; height and no
      zoomImage is provided, it will disable all functionality (including
      cursor).
    </p>
    <hr />
    <h2>Don&apos;t exceed original image dimensions</h2>
    <p>
      <ImageZoom
        image={{
          src: 'https://rpearce.github.io/react-medium-image-zoom/gazelle.jpg',
          alt: 'Gazelle Stomping',
          title: "Don't exceed original image dimensions...",
          style: {
            width: '250px'
          }
        }}
        shouldRespectMaxDimension={true}
      />
    </p>
    <h2>Disable component if image is already at its max dimensions</h2>
    <p>
      <ImageZoom
        image={{
          src:
            'https://user-images.githubusercontent.com/592876/30724341-68df3036-9f91-11e7-9741-2f0aaa7d9df7.jpg',
          alt:
            'Puppy licking hand – https://www.instagram.com/p/BReegO8Bf0w/?taken-by=raleigh_thelabpup',
          title: 'Disable library if image is already max'
        }}
        shouldRespectMaxDimension={true}
      />
    </p>
  </div>


export default ShouldRespectMaxDimension
