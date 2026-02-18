import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

export default class A_Label extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, label } = this.props

    return (
      <label className="A_Label" htmlFor={name}>
        {label}
      </label>
    )
  }
}
