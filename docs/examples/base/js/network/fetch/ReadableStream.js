/*
 * 协议层要求
 * Transfer-Encoding: chunked
 * connection: keep-alive
 * */
fetch('/large-file.txt').then((response) => {
  const reader = response.body.getReader()
  return new ReadableStream({
    start(controller) {
      function push() {
        reader.read().then(({ done, value }) => {
          if (done) {
            controller.close()
            return
          }
          controller.enqueue(value)
          push()
        })
      }

      push()
    },
  })
})
