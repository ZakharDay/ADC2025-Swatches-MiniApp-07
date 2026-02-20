import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Button from '../components/A_Button.jsx'
import A_Text from '../components/A_Text.jsx'
import O_Swatch from '../components/O_Swatch.jsx'
import O_PageHeader from '../components/O_PageHeader.jsx'

export default class T_Swatches extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    const { initSwatchesPage } = this.props
    initSwatchesPage()
  }

  render() {
    const { swatches, handleNewSwatchClick } = this.props
    const swatchCopmonents = []

    if (swatches) {
      swatches.forEach((swatch) => {
        swatchCopmonents.push(<O_Swatch {...swatch} key={swatch.id} />)
      })
    }

    return (
      <div className="T_Swatches">
        <O_PageHeader
          headingText="Палитры"
          buttonText="Создать"
          handleClick={handleNewSwatchClick}
        />

        {swatchCopmonents}
      </div>
    )
  }
}
