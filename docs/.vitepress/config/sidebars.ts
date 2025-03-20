import sidebarsJson from './sidebars.json'

const parse = (list) => {
  return list.map((n) => {
    if (n?.items) {
      return { ...n, items: parse(n.items) }
    } else if (typeof n === 'string') {
      return { text: n, link: n }
    } else {
      if ('text' in n && !('link' in n)) {
        n.link = n.text
      }
      return n
    }
  })
}

const getSidebar = (json) => {
  const result = {}

  return Object.fromEntries(
    Object.entries(json).map(([key, value]) => {
      return [key, parse(value)]
    }),
  )
}

export const sidebars = getSidebar(sidebarsJson)
