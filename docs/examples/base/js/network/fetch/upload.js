const formData = new FormData()
formData.append('file', fileInput.files[0])
fetch('/upload', {
  method: 'POST',
  body: formData, // 自动设置 multipart/form-data
})
