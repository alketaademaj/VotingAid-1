import React, { Fragment, useState } from 'react'
import axios from 'axios';

const FileUpload = () => {

    const [file, setFile] = useState(''); //useState is the default file: ''; only call setFile instead of setState 
    const [filename, setFilename] = useState('Choose file');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]); //html input you can do multiple files, so it is like an array
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });

        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    return (
        <Fragment>
            <form onSubmit={onSubmit}>
                <div class="custom-file mb-4">
                    <input type="file" class="custom-file-input" id="customFile" onChange={onChange} />
                    <label class="custom-file-label" htmlFor="custom-file">
                        {filename}
                    </label>
                </div>
                <input type="submit" value="Upload" />
            </form>
            {  uploadedFile ? <div>
                <div>
                    <h3 className="text-center">{uploadedFile.fileName}</h3>
                    <img src={uploadedFile.filePath} alt=""></img>
                </div>
            </div> : null}
        </Fragment>
    )
}
export default FileUpload
