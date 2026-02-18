import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

import A_Button from '../components/A_Button.jsx'
import M_TitleWithDescriptor from '../components/M_TitleWithDescriptor.jsx'
import O_Form from '../components/O_Form.jsx'

export default class T_SignInForm extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { page, actions, formData, handlePageChange } = this.props
    const { header, form } = page

    return (
      <div className="T_SignInForm">
        <div className="W_FlexGroup">
          <M_TitleWithDescriptor {...header} />
          <O_Form {...form} formData={formData} actions={actions} />
        </div>

        <A_Button
          type="tertiary"
          text="Вернуться назад"
          handleClick={handlePageChange}
        />
      </div>
    )
  }
}
