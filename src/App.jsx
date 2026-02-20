import { intersection } from 'lodash'
import classnames from 'classnames'
import Cookies from 'js-cookie'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import { utilities } from './utilities.js'

import T_SubscriptionForm from './javascript/templates/T_SubscriptionForm.jsx'
import T_SignInForm from './javascript/templates/T_SignInForm.jsx'
import T_Swatches from './javascript/templates/T_Swatches.jsx'
import T_NewSwatch from './javascript/templates/T_NewSwatch.jsx'

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    const page = props.pages.subscription
    const formData = utilities.extractFormDataFromPageProps(page)

    const newSwatchForm = {
      heading: '',
      fillCardsVisible: false,
      fillCards: [],
      fillCardsChosen: []
    }

    this.state = {
      page,
      formData,
      newSwatchForm
    }
  }

  componentDidMount() {
    this.initSwatchesPage()
  }

  initSwatchesPage = () => {
    const { pages, jwt, urls } = this.props

    if (jwt) {
      this.setState({
        page: pages.swatches
      })

      fetch(urls.getSwatches, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            swatches: data
          })
        })
    }
  }

  handlePageChange = (page) => {
    const formData = utilities.extractFormDataFromPageProps(page)

    this.setState({
      page,
      formData
    })
  }

  handleClickOutside = (e) => {
    const elementParentClasses = utilities.getParentClasses(e.target)
    const { selectMenuClasses } = this.props

    const targetedClasses = intersection(
      elementParentClasses,
      selectMenuClasses
    )

    // if (targetedClasses.length == 0) {
    //   this.setState({
    //     fillCardsVisible: false
    //   })
    // }
  }

  handleInput = (param, value) => {
    const { formData } = this.state
    const updatedFormData = Object.assign({}, formData, { [param]: value })

    this.setState({
      formData: updatedFormData
    })
  }

  handleSubscriptionFormResponse = () => {
    const { page } = this.state
    const updatedPage = structuredClone(page)
    updatedPage.form.visible = false

    this.setState({
      page: updatedPage
    })
  }

  handleSignInFormResponse = (data) => {
    Cookies.set('jwt', data.jwt)
    window.location.reload()
  }

  handleFormSubmit = () => {
    const { page, formData } = this.state
    const { url, entity, callback } = page.form

    const serializedFormData = {
      [entity]: {
        ...formData
      }
    }

    const callbacks = {
      handleSubscriptionFormResponse: this.handleSubscriptionFormResponse,
      handleSignInFormResponse: this.handleSignInFormResponse
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(serializedFormData),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        callbacks[callback](data)
      })
  }

  //
  // NEW SWATCH
  //

  handleNewSwatchNewFillButtonClick = () => {
    console.log('handleNewSwatchNewFillButtonClick')

    const { newSwatchForm } = this.state
    const { urls, jwt } = this.props

    fetch(urls.getFills, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)

        const updatedSwatchForm = structuredClone(newSwatchForm)
        updatedSwatchForm.fillCardsVisible = true
        updatedSwatchForm.fillCards = data

        this.setState({
          newSwatchForm: updatedSwatchForm
        })
      })
  }

  handleNewSwatchHeadingInput = (param, value) => {
    const { newSwatchForm } = this.state
    const updatedSwatchForm = structuredClone(newSwatchForm)
    console.log(value)

    updatedSwatchForm.heading = value

    this.setState({
      newSwatchForm: updatedSwatchForm
    })
  }

  handleNewSwatchFillCardClick = (id) => {
    const { newSwatchForm } = this.state
    const { heading, fillCards, fillCardsChosen } = newSwatchForm
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
      newSwatchForm: {
        heading,
        fillCardsVisible: false,
        fillCards: [],
        fillCardsChosen: updatedFillCardsChosen
      }
    })
  }

  handleNewSwatchFormSubmit = () => {
    const { pages, urls, jwt } = this.props
    const { newSwatchForm } = this.state
    const { heading, fillCardsChosen } = newSwatchForm
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

    fetch(urls.createSwatch, {
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

        // TODO
        // Сделать переход на Show Swatch Page

        this.handlePageChange(pages.swatches)

        // const redirectUrl = `${showSwatchUrl}?swatch=${data.swatch_id}`
        // window.location.href = redirectUrl
      })
  }

  render() {
    const { pages } = this.props
    const { page, formData, newSwatchForm, swatches } = this.state
    const { layout, template } = page

    const formPageActions = {
      handleInput: this.handleInput,
      handleFormSubmit: this.handleFormSubmit
    }

    const newSwatchActions = {
      handleClickOutside: this.handleClickOutside,
      handleBackClick: () => this.handlePageChange(pages.swatches),
      handleNewFillButtonClick: this.handleNewSwatchNewFillButtonClick,
      handleHeadingInput: this.handleNewSwatchHeadingInput,
      handleFillCardClick: this.handleNewSwatchFillCardClick,
      handleFormSubmit: this.handleNewSwatchFormSubmit
    }

    const className = classnames({
      [layout]: true
    })

    const templates = {
      T_SubscriptionForm: (
        <T_SubscriptionForm
          page={page}
          actions={formPageActions}
          formData={formData}
          handlePageChange={() => this.handlePageChange(pages.signIn)}
        />
      ),
      T_SignInForm: (
        <T_SignInForm
          page={page}
          actions={formPageActions}
          formData={formData}
          handlePageChange={() => this.handlePageChange(pages.subscription)}
        />
      ),
      T_Swatches: (
        <T_Swatches
          swatches={swatches}
          initSwatchesPage={this.initSwatchesPage}
          handleNewSwatchClick={() => this.handlePageChange(pages.newSwatch)}
        />
      ),
      T_NewSwatch: <T_NewSwatch {...newSwatchForm} actions={newSwatchActions} />
    }

    return (
      <div className="App">
        <div className={className}>{templates[template]}</div>
      </div>
    )
  }
}
