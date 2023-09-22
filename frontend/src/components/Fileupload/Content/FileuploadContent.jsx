import React from 'react';
import { useState } from 'react';

function FileuploadContent() {

   // const [filename, setFilename] = useState();
    const onFileUpload = async (e) => {
        e.preventDefault()
    }
    const handleFileupload = async (e) =>{
        e.preventDefault()
        const file = e.target.files[0];
        console.log(file);
        
    }
  return (
    <div>
        <h3>
            File Upload using React!
        </h3>
        <div>
            <form>
                <input type="file" lable="Image" name="filename" onChange={(e)=>handleFileupload(e)} />
                <button type="Submit" onClick={onFileUpload}>Upload</button>
            </form>
        </div>
    </div>
    
  )
}

export default FileuploadContent