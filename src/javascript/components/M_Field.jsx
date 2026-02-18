import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Label from './A_Label.jsx'
import A_Input from './A_Input.jsx'

export default class M_Field extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { label, name, param, type, placeholder, value, actions } = this.props

    return (
      <div className="M_Field">
        <A_Label name={name} label={label} />

        <A_Input
          type={type}
          placeholder={placeholder}
          value={value}
          param={param}
          handleInput={actions.handleInput}
        />
      </div>
    )
  }
}
