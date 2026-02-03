import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_FillCard from './A_FillCard.jsx'

export default class M_FillCards extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { fillCards, handleCardClick } = this.props
    const fillCardComponents = []

    console.log('redered', fillCards)

    fillCards.forEach((fillCard) => {
      fillCardComponents.push(
        <A_FillCard
          fillCard={fillCard}
          handleCardClick={handleCardClick}
          key={fillCard.id}
        />
      )
    })

    return <div className="M_FillCards">{fillCardComponents}</div>
  }
}
