import React, { useState, useEffect } from 'react'

const Upload = ({ email }) => {
    const [fileInputState, setFileInputState] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const fileName = e.target.files[0];
        previewFile(file)
        setSelectedFile(file.name)
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        // shows the picture you are uploading, not necessary
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
            // console.log(reader.result)
        }
    }
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource, selectedFile);
    }

    const uploadImage = async (base64EncodedImage, fileName) => {
        console.log(email)
        try {
            const res = await fetch('/api/uploadImage', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage, email, fileName }),
                headers: { 'Content-type': 'application/json' },
            }).then(res => {
                console.log(res)
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmitFile}>
                <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} className="form-input" />
                <button className="form-input" type="submit">Submit</button>
            </form>
            {/* {previewSource && (
                <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
            )} */}
        </div>
    )
}

export default Upload
