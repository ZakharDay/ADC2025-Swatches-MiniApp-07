export default function getParentClasses(element) {
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
