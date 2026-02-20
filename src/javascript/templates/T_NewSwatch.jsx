import classnames from 'classnames'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Button from '../components/A_Button.jsx'
import A_Input from '../components/A_Input.jsx'
import A_FillCard from '../components/A_FillCard.jsx'
import O_PageHeader from '../components/O_PageHeader.jsx'

export default class T_NewSwatch extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { actions } = this.props
    document.addEventListener('mousedown', actions.handleClickOutside)
  }

  componentWillUnmount() {
    const { actions } = this.props
    document.removeEventListener('mousedown', actions.handleClickOutside)
  }

  renderFillCards = (type, cards) => {
    const { fillCards, fillCardsVisible, actions } = this.props

    const cardComponents = []

    cards.forEach((fillCard) => {
      cardComponents.push(
        <A_FillCard
          {...fillCard}
          handleCardClick={actions.handleFillCardClick}
          key={fillCard.id}
        />
      )
    })

    const classes = classnames({
      W_FillCards: true,
      [type]: true,
      fillCardsVisible
    })

    return (
      <div className="W_FillCardsContainer">
        <div className={classes}>
          {type == 'chosen' && (
            <A_Button
              type="addFillButton"
              text="Добавить заливку"
              handleClick={actions.handleNewFillButtonClick}
            />
          )}

          {cardComponents}
        </div>

        {type == 'chosen' && fillCardsVisible && (
          <div className="W_FillCardsDefault">
            {this.renderFillCards('default', fillCards)}
          </div>
        )}
      </div>
    )
  }

  render() {
    const { heading, fillCardsChosen, actions } = this.props

    return (
      <div className="T_NewSwatch">
        <O_PageHeader
          headingText="Новая палитра"
          buttonText="Назад"
          handleClick={actions.handleBackClick}
        />

        <A_Input
          placeholder="Придумайте название палитры"
          param="newSwatchName"
          value={heading}
          handleInput={actions.handleHeadingInput}
        />

        {this.renderFillCards('chosen', fillCardsChosen)}

        <A_Button
          text="Создать палитру"
          handleClick={actions.handleFormSubmit}
        />
      </div>
    )
  }
}
