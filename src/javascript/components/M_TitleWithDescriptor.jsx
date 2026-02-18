import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Text from './A_Text.jsx'

export default class M_TitleWithDescriptor extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { heading, description } = this.props

    return (
      <div className="M_TitleWithDescriptor display">
        <A_Text type="display-heading-1" text={heading} />
        <A_Text type="display-paragraph" text={description} />
      </div>
    )
  }
}
