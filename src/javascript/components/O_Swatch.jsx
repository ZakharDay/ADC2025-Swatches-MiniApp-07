import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Text from './A_Text.jsx'
import A_FillCard from './A_FillCard.jsx'

export default class O_Swatch extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { name, fills } = this.props
    const fillComponents = []

    fills.forEach((fill) => {
      fillComponents.push(<A_FillCard {...fill} key={fill.id} />)
    })

    return (
      <div className="O_Swatch">
        <A_Text type="display-heading-2" text={name} />

        <div className="W_Fills">{fillComponents}</div>
      </div>
    )
  }
}
