import { ref, reactive, computed } from "vue";

// 可选项配置
export const sizeUnits = ['px', '%', 'em', 'rem', 'vh', 'vw']
export const alignOptions = ['auto', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline']
export const currentIndex = ref(0)
export const toggleActive = (index) => currentIndex.value = index
// 子项目数据模型
const createNewItem = () => ({
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: { value: 4, unit: 'rem' },
    order: 0,
    alignSelf: 'auto'
})

// 初始化项目
export const items = reactive([createNewItem(), createNewItem(), createNewItem()])
export const flexItemModel = computed(() => items[currentIndex.value])

// 项目操作
export const addItem = () => {
    if (items.length < 6) {
        items.push(createNewItem())
    }
}
export const removeItem = () => {
    if (items.length > 3) {
        if (currentIndex.value === items.length - 1) {
            currentIndex.value--
        }
        items.pop()
    }
}
export const reset = () => {
    currentIndex.value = 0
    items.splice(0, items.length)
    items.push(createNewItem(), createNewItem(), createNewItem())
}

// 项目样式计算
export const getItemStyle = (item) => ({
    flex: `${ item.flexGrow } ${ item.flexShrink } ${ item.flexBasis.value }${ item.flexBasis.unit }`,
    order: item.order,
    alignSelf: item.alignSelf
})
