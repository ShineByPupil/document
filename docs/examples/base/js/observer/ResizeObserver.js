const log = (obj, key) => {
  const { inlineSize, blockSize } = obj[key][0]
  console.log(`${key}: ${inlineSize} x ${blockSize}`)
}

const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    console.group('ResizeObserverEntry')
    console.log('target:', entry.target) // 被观察的元素
    console.log('contentRect:', entry.contentRect) // 元素内容框的边界信息
    log(entry, 'borderBoxSize') // 元素边框尺寸
    log(entry, 'contentBoxSize') // 元素内容框尺寸
    log(entry, 'devicePixelContentBoxSize') // 元素内容框尺寸（设备像素）
    console.groupEnd()
  })
})

const element = document.createElement('div')
document.body.appendChild(element)
observer.observe(element)
element.style.width = '100px'
element.style.height = '200px'
element.style.border = '1px solid black'
