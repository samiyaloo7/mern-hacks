## usage ...

// file_to_upload is file object.

axios.post('http://localhost:4000/fileUpload', {"myImg": file_to_upload},{
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});
