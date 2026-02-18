function getParentClasses(element) {
  const classes = []
  let parent = element.parentNode

  while (parent && parent.parentNode) {
    parent.classList.forEach((c) => {
      classes.push(c)
    })

    parent = parent.parentNode
  }

  return classes
}

function extractFormDataFromPageProps(pageProps) {
  const formData = {}

  pageProps.form.fields.forEach((field) => {
    const { param } = field
    formData[param] = ''
  })

  return formData
}

export const utilities = {
  getParentClasses,
  extractFormDataFromPageProps
}
