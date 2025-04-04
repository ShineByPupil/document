const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.group('IntersectionObserverEntry')
      // 目标元素的边界信息
      console.log('boundingClientRect:', entry.boundingClientRect)
      // 根元素的边界信息
      console.log('rootBounds:', entry.rootBounds)
      // 相交区域的边界信息
      console.log('intersectionRect:', entry.intersectionRect)
      // 相交区域可见比例 (0-1)
      console.log('intersectionRatio:', entry.intersectionRatio)
      // 是否交叉（true/false）
      console.log('isIntersecting:', entry.isIntersecting)
      // 被观察的元素
      console.log('target:', entry.target)
      // 从初始化到交叉被观察的时间戳（毫秒）
      console.log('time:', entry.time)
      console.groupEnd()
    })
  },
  {
    // 观察配置
    root: null, // 根元素（默认视口）
    rootMargin: '0px', // 根元素外边距（可触发提前加载）
    threshold: [0, 0.5, 1], // 触发阈值的数组
  },
)

const element = document.createElement('div')
element.style.width = '200px'
element.style.height = '200px'
element.style.backgroundColor = 'red'

document.body.appendChild(element)

observer.observe(element) // 开始观察元素，滚动触发观察
