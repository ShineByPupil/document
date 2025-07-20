// sidebars.ts
import sidebarsJson from './sidebars.json'
import type {
  SidebarItem,
  Sidebars,
  RawItem,
  ParseFunction,
  GetSidebar,
} from './sidebars.type'

export const files: string[] = []

const parse: ParseFunction = function (list, parentBase) {
  return list.map((item) => {
    if (typeof item === 'string') {
      const filesPath = `${parentBase}${item}`
      files.push(`${filesPath}.md`, `${filesPath}/index.md`)
      return { text: item, link: item }
    }

    if (item?.items) {
      item.items = parse(item.items, item.base ?? parentBase)
      return item as SidebarItem
    } else {
      const filesPath = `${item.base ?? parentBase}${item.link ?? item.text}`
      files.push(`${filesPath}.md`, `${filesPath}/index.md`)
      return {
        text: item.text,
        link: item.link ?? item.text, // 确保 link 必填
      }
    }
  })
}

const getSidebar: GetSidebar = (json) => {
  return Object.fromEntries(
    Object.entries(json).map(([key, value]) => {
      return [key, parse(value, key)]
    }),
  )
}

export const sidebars: Sidebars = getSidebar(sidebarsJson)
