import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_FillCard extends PureComponent {
  constructor(props) {
    super(props)
  }

  getCssBackgroundValue = (fill) => {
    let cssColor

    if (fill.fill_colors.length > 1) {
      const colors = []

      fill.fill_colors.forEach((fill_color) => {
        colors.push(`#${fill_color.rgb_hash} ${fill_color.stop}%`)
      })

      const cssColors = colors.join(', ')
      cssColor = 'linear-gradient(90deg, ' + cssColors + ')'
    } else if (fill.fill_colors.length == 1) {
      cssColor = '#' + fill.fill_colors[0].rgb_hash
    }

    return cssColor
  }

  render() {
    const { fillCard, handleCardClick } = this.props
    const backgroundColor = this.getCssBackgroundValue(fillCard)

    const styles = {
      backgroundColor: backgroundColor,
      backgroundImage: backgroundColor
    }

    return (
      <div
        className="A_FillCard"
        onClick={() => {
          handleCardClick(fillCard.id)
        }}
      >
        <div className="fillColor" style={styles}></div>

        <div className="fillInfo">
          <div className="fillHex">{`Colors: ${fillCard.fill_colors.length}`}</div>
          <div className="fillName">{`Variable: ${fillCard.name}`}</div>
        </div>
      </div>
    )
  }
}

// const fill = document.createElement('div')
// const color = document.createElement('div')
// const info = document.createElement('div')
// const hex = document.createElement('div')
// const name = document.createElement('div')

// fill.classList.add('fillCard')
// color.classList.add('fillColor')
// info.classList.add('fillCardInfo')
// name.classList.add('fillName')

// fill.dataset.id = data.id
// hex.innerText = `Colors: ${data.fill_colors.length}`
// name.innerText = `Variable: ${data.name}`

// setCssBackgroundValue(color, data)

// fill.appendChild(color)
// fill.appendChild(info)
// info.appendChild(hex)
// info.appendChild(name)
// container.appendChild(fill)
