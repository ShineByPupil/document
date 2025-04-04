xhr.upload.onprogress = function (event) {
  if (event.lengthComputable) {
    const percent = (event.loaded / event.total) * 100
    console.log(`上传进度: ${percent.toFixed(2)}%`)
  }
}

xhr.onload = function () {
  if (xhr.status === 200) {
    console.log('上传完成')
  } else {
    console.error('上传失败状态:', xhr.status)
  }
}

// 发送 FormData
let formData = new FormData()
formData.append('file', fileInput.files[0])
xhr.send(formData)
