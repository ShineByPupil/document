// sidebars.type.ts

// 导航栏
export interface NavItem {
  text: string
  base: string
  items: RawItem[] // 侧边栏
}

// 侧边栏原始数据
export type RawItem =
  | string
  | {
      text: string
      link?: string
      base?: string
      collapsed?: boolean
      items?: RawItem[]
    }

// 解析后的侧边栏数据
export interface SidebarItem {
  text: string
  link: string
  base?: string
  collapsed?: boolean
  items?: SidebarItem[]
}

export type Sidebars = Record<string, SidebarItem[]>

export type ParseFunction = (
  list: RawItem[],
  parentBase: string,
) => SidebarItem[]

export type GetSidebar = (json: Record<string, NavItem[]>) => Sidebars
