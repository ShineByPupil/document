xhr.timeout = 5000 // 5秒超时

xhr.ontimeout = function () {
  console.error('Request timed out')
}
