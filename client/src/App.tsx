import { useState, type ChangeEvent, type FormEvent, useRef } from "react";
import "./App.css";

interface UploadResponse {
  success: boolean;
  message: string;
  url?: string;
  public_id?: string;
}

const App = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResponse | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelection(selectedFile);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    // Validate file type
    if (!selectedFile.type.startsWith("image/")) {
      setUploadResult({
        success: false,
        message: "Please select an image file only.",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setUploadResult({
        success: false,
        message: "File size must be less than 5MB.",
      });
      return;
    }

    setFile(selectedFile);
    setUploadResult(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      setUploadResult({
        success: false,
        message: "Please select a file first!",
      });
      return;
    }

    setIsUploading(true);
    setUploadResult(null);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });
      const data: UploadResponse = await response.json();

      setUploadResult(data);
    } catch {
      setUploadResult({
        success: false,
        message: "Upload failed. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelection(droppedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setUploadResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📸 Image Upload</h1>
          <p>Upload your images to Cloudinary with ease</p>
        </header>

        <div className="upload-section">
          <form onSubmit={handleSubmit} className="upload-form">
            <div
              className={`drop-zone ${isDragOver ? "drag-over" : ""} ${
                file ? "has-file" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="image-preview" />
                  <div className="file-info">
                    <p className="file-name">{file?.name}</p>
                    <p className="file-size">
                      {file && formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="clear-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearFile();
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <div className="upload-icon">📁</div>
                  <p className="upload-text">
                    Drag & drop your image here, or{" "}
                    <span className="browse-link">browse</span>
                  </p>
                  <p className="upload-hint">
                    Supports: JPG, PNG, GIF, WebP (max 5MB)
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`upload-btn ${isUploading ? "uploading" : ""}`}
              disabled={!file || isUploading}
            >
              {isUploading ? (
                <>
                  <div className="spinner"></div>
                  Uploading...
                </>
              ) : (
                "Upload Image"
              )}
            </button>
          </form>

          {uploadResult && (
            <div
              className={`result ${uploadResult.success ? "success" : "error"}`}
            >
              <div className="result-icon">
                {uploadResult.success ? "✅" : "❌"}
              </div>
              <div className="result-content">
                <h3>
                  {uploadResult.success
                    ? "Upload Successful!"
                    : "Upload Failed"}
                </h3>
                <p>{uploadResult.message}</p>
                {uploadResult.success && uploadResult.url && (
                  <div className="uploaded-image">
                    <img src={uploadResult.url} alt="Uploaded" />
                    <a
                      href={uploadResult.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-link"
                    >
                      View on Cloudinary ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
