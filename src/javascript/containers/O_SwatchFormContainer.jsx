import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Button from '../components/A_Button.jsx'
import A_Input from '../components/A_Input.jsx'
import M_FillCards from '../components/M_FillCards.jsx'

export default class O_SwatchFormContainer extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      heading: '',
      fillCards: [],
      fillCardsChosen: []
    }
  }

  componentDidMount() {
    const { getFillsUrl, jwt } = this.props

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
    const updatedFillCards = []
    const updatedFillCardsChosen = [...fillCardsChosen]

    fillCards.forEach((fillCard) => {
      if (fillCard.id == id) {
        updatedFillCardsChosen.push(fillCard)
      } else {
        updatedFillCards.push(fillCard)
      }
    })

    this.setState({
      fillCards: updatedFillCards,
      fillCardsChosen: updatedFillCardsChosen
    })
  }

  handleFillCardChosenClick = (id) => {
    const { fillCards, fillCardsChosen } = this.state
    const updatedFillCards = [...fillCards]
    const updatedFillCardsChosen = []

    fillCardsChosen.forEach((fillCard) => {
      if (fillCard.id == id) {
        updatedFillCards.push(fillCard)
      } else {
        updatedFillCardsChosen.push(fillCard)
      }
    })

    this.setState({
      fillCards: updatedFillCards,
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

  render() {
    const { heading, fillCards, fillCardsChosen } = this.state

    return (
      <div className="O_SwatchFormContainer">
        <A_Input
          placeholder="Придумайте название палитры"
          value={heading}
          handleInput={this.handleHeadingInput}
        />

        <M_FillCards
          fillCards={fillCardsChosen}
          handleCardClick={this.handleFillCardChosenClick}
        />

        <M_FillCards
          fillCards={fillCards}
          handleCardClick={this.handleFillCardClick}
        />

        <A_Button text="Создать палитру" handleClick={this.handleFormSubmit} />
      </div>
    )
  }
}
