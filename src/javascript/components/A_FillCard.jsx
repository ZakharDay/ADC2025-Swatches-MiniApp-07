import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_FillCard extends PureComponent {
  constructor(props) {
    super(props)
  }

  getCssBackgroundValue = (fill_colors) => {
    if (fill_colors.length > 1) {
      const colors = []

      fill_colors.forEach((fill_color) => {
        colors.push(`#${fill_color.rgb_hash} ${fill_color.stop}%`)
      })

      return 'linear-gradient(90deg, ' + colors.join(', ') + ')'
    } else if (fill_colors.length == 1) {
      return '#' + fill_colors[0].rgb_hash
    }
  }

  handleCardClick = (e) => {
    console.log(e, e.targer)

    const { id, handleCardClick } = this.props
    handleCardClick(id)
  }

  render() {
    const { id, name, fill_colors, handleCardClick } = this.props
    const backgroundColor = this.getCssBackgroundValue(fill_colors)

    const styles = {
      backgroundColor: backgroundColor,
      backgroundImage: backgroundColor
    }

    return (
      <div
        className="A_FillCard"
        onClick={
          this.handleCardClick
          // () => {
          //   handleCardClick(id)
          // }
        }
      >
        <div className="fillColor" style={styles}></div>

        <div className="fillInfo">
          <div className="fillHex">{`Colors: ${fill_colors.length}`}</div>
          <div className="fillName">{`Variable: ${name}`}</div>
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
