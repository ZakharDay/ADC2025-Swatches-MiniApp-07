import { intersection } from 'lodash'
import classnames from 'classnames'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import getParentClasses from '../utilities.js'

import A_Button from '../components/A_Button.jsx'
import A_Input from '../components/A_Input.jsx'
import A_FillCard from '../components/A_FillCard.jsx'

export default class O_SwatchFormContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      heading: '',
      fillCardsVisible: false,
      fillCards: [],
      fillCardsChosen: []
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleClickOutside = (e) => {
    const elementParentClasses = getParentClasses(e.target)
    const { selectMenuClasses } = this.props

    const targetedClasses = intersection(
      elementParentClasses,
      selectMenuClasses
    )

    if (targetedClasses.length == 0) {
      this.setState({
        fillCardsVisible: false
      })
    }
  }

  handleNewFillButtonClick = () => {
    const { getFillsUrl, jwt } = this.props

    this.setState({
      fillCardsVisible: true
    })

    fetch(getFillsUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        this.setState({
          fillCards: data
        })
      })
  }

  handleFillCardClick = (id) => {
    const { fillCards, fillCardsChosen } = this.state
    const updatedFillCardsChosen = []

    fillCardsChosen.forEach((fillCard) => {
      if (fillCard.id != id) {
        updatedFillCardsChosen.push(fillCard)
      }
    })

    fillCards.forEach((fillCard) => {
      if (fillCard.id == id) {
        updatedFillCardsChosen.push(fillCard)
      }
    })

    this.setState({
      fillCardsVisible: false,
      fillCards: [],
      fillCardsChosen: updatedFillCardsChosen
    })
  }

  handleHeadingInput = (text) => {
    this.setState({
      heading: text
    })
  }

  handleFormSubmit = () => {
    const { createSwatchUrl, showSwatchUrl, jwt } = this.props
    const { heading, fillCardsChosen } = this.state
    const fillIds = []

    fillCardsChosen.forEach((fillCardChosen) => {
      fillIds.push(fillCardChosen.id)
    })

    const params = {
      swatch: {
        name: heading,
        fill_ids: fillIds
      }
    }

    fetch(createSwatchUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${jwt}`
      },
      body: JSON.stringify(params)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        const redirectUrl = `${showSwatchUrl}?swatch=${data.swatch_id}`
        window.location.href = redirectUrl
      })
  }

  renderFillCards = (type, cards) => {
    const { fillCards, fillCardsVisible } = this.state
    const cardComponents = []

    cards.forEach((fillCard) => {
      cardComponents.push(
        <A_FillCard
          {...fillCard}
          handleCardClick={this.handleFillCardClick}
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
              handleClick={this.handleNewFillButtonClick}
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
    const { heading, fillCardsChosen } = this.state

    return (
      <div className="O_SwatchFormContainer">
        <A_Input
          placeholder="Придумайте название палитры"
          value={heading}
          handleInput={this.handleHeadingInput}
        />

        {this.renderFillCards('chosen', fillCardsChosen)}

        <A_Button text="Создать палитру" handleClick={this.handleFormSubmit} />
      </div>
    )
  }
}
