import React from 'react'
import { useState } from 'react';
import Axios from "axios";
function Testvalidation() {
  const [file, setFile] = useState()
  const upload = () => {
    const formData = new FormData()
    formData.append('file', file)
    console.log(formData);
    Axios.post('http://localhost:5001/upload',formData )
    .then( res => {})
    .catch(er => console.log(er))
  }
  return (
    <div>
    <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
    <button type="button" onClick={upload}>Upload</button>
  </div>
  )
}

export default Testvalidation