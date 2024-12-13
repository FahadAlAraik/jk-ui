import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [ocrResults, setOcrResults] = useState([]);

    useEffect(() => {
        console.log('Updated OCR Results:', ocrResults);
    }, [ocrResults]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        setSelectedFiles(files);

        const filePreviews = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });

        Promise.all(filePreviews).then((previewImages) => {
            setPreviews(previewImages);
        });
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) return;

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('images', file);
        });

        // Simulating a fake OCR result to test the display
        setOcrResults([{ filename: 'sample.jpg', text: 'Lorem ipsum dolor sit amettyutyutyutyutyutyutyuty' }]);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setOcrResults(response.data.ocrResults);
            console.log('Files uploaded and OCR processed successfully:', response.data);
        } catch (error) {
            console.error('Error uploading files:', error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <input type="file" multiple onChange={handleFileChange} accept="image/*" />
            <div style={{ marginTop: '20px' }}>
                {previews.map((preview, index) => (
                    <img
                        key={index}
                        src={preview}
                        alt={`Preview ${index}`}
                        style={{ maxHeight: '150px', margin: '10px' }}
                    />
                ))}
            </div>
            <button onClick={handleUpload} style={{ marginTop: '20px', padding: '10px 20px', fontSize: '16px' }}>
                Upload Images
            </button>
            <div style={{ marginTop: '20px', textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
                {ocrResults.map((result, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <h3>Result for: {result.filename}</h3>
                        <p>{result.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageUpload;
