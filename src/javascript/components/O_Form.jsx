import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Button from './A_Button.jsx'
import M_Field from './M_Field.jsx'

export default class O_Form extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { fields, buttons, actions, formData } = this.props

    const fieldComponents = []
    const buttonComponents = []

    fields.forEach((field) => {
      let value

      Object.keys(formData).forEach((key) => {
        if (key == field.param) {
          value = formData[key]
        }
      })

      fieldComponents.push(
        <M_Field {...field} value={value} actions={actions} key={field.name} />
      )
    })

    buttons.forEach((button) => {
      if (button.type == 'primary') {
        buttonComponents.push(
          <A_Button
            {...button}
            handleClick={actions.handleFormSubmit}
            key={button.text}
          />
        )
      } else {
        buttonComponents.push(<A_Button {...button} key={button.text} />)
      }
    })

    return (
      <div className="O_Form">
        {fieldComponents}
        {buttonComponents}
      </div>
    )
  }
}
