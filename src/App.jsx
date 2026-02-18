import classnames from 'classnames'
import Cookies from 'js-cookie'
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import { utilities } from './utilities.js'

import T_SubscriptionForm from './javascript/templates/T_SubscriptionForm.jsx'
import T_SignInForm from './javascript/templates/T_SignInForm.jsx'
import T_Swatches from './javascript/templates/T_Swatches.jsx'

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    const page = props.pages.subscription
    const formData = utilities.extractFormDataFromPageProps(page)

    this.state = {
      page,
      formData
    }
  }

  componentDidMount() {
    const { pages, jwt } = this.props

    if (jwt) {
      this.setState({
        page: pages.swatches
      })
    }
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

  handlePageChange = (page) => {
    const formData = utilities.extractFormDataFromPageProps(page)

    this.setState({
      page,
      formData
    })
  }

  render() {
    const { pages } = this.props
    const { page, formData } = this.state
    const { layout, template } = page

    const actions = {
      handleInput: this.handleInput,
      handleFormSubmit: this.handleFormSubmit
    }

    const className = classnames({
      [layout]: true
    })

    const templates = {
      T_SubscriptionForm: (
        <T_SubscriptionForm
          page={page}
          actions={actions}
          formData={formData}
          handlePageChange={() => this.handlePageChange(pages.signIn)}
        />
      ),
      T_SignInForm: (
        <T_SignInForm
          page={page}
          actions={actions}
          formData={formData}
          handlePageChange={() => this.handlePageChange(pages.subscription)}
        />
      ),
      T_Swatches: <T_Swatches />
    }

    return (
      <div className="App">
        <div className={className}>{templates[template]}</div>
      </div>
    )
  }
}
