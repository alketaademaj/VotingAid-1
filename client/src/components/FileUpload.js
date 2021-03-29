import React, { Fragment, useState } from 'react'
// import { ProgressBar } from "react-bootstrap"
import axios from 'axios';
import Swal from 'sweetalert2';

const FileUpload = ({ email, onUpload }) => { //fix the email, each candidate should be able to change their profile pic 

    const [file, setFile] = useState(''); //useState is the default file: ''; only call setFile instead of setState 
    const [filename, setFilename] = useState('Choose file');
    const [uploadedFile, setUploadedFile] = useState({});

    const onChange = e => {
        setFile(e.target.files[0]); //html input you can do multiple files, so it is like an array
        setFilename(e.target.files[0].name);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('email', email)
        formData.append('file', file);

        try {
            const res = await axios.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            const { fileName, filePath } = res.data;
            setUploadedFile({ fileName, filePath });
            if (typeof onUpload === 'function') {
                onUpload({ fileName, filePath })
            }
        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }

    const alert = () => {
        Swal.fire({
            title: 'You have succesfully submitted a question!',
            icon: "success",
            confirmButtonText: "Confirm",
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
                    <label className="custom-file-label" htmlFor="custom-file">
                        {filename}
                    </label>
                </div>
                <input onClick={alert} type="submit" value="Upload" />
            </form>
        </div>
    )
}
export default FileUpload
