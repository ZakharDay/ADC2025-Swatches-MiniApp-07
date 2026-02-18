import Cookies from 'js-cookie'
import React from 'react'
import { createRoot } from 'react-dom/client'

import O_SwatchFormContainer from './containers/O_SwatchFormContainer.jsx'

const container = document.querySelector('.newSwatchForm')
const getFillsUrl = container.dataset.getFillsUrl
const createSwatchUrl = container.dataset.createSwatchUrl
const showSwatchUrl = container.dataset.showSwatchUrl
const jwt = Cookies.get('jwt')
const root = createRoot(container)

const selectMenuClasses = ['W_FillCardsDefault']

root.render(
  <O_SwatchFormContainer
    getFillsUrl={getFillsUrl}
    createSwatchUrl={createSwatchUrl}
    showSwatchUrl={showSwatchUrl}
    jwt={jwt}
    selectMenuClasses={selectMenuClasses}
  />
)
