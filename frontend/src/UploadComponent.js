import React, { useState } from "react";

function UploadComponent() {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("http://127.0.0.1:8000/predict/", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        setResult(data.detections);
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
}

export default UploadComponent;
