import React, { useState } from "react";
import "./UploadPhotoModal.css";
import Button from "../Button/Button";

interface UploadPhotoModalProps {
  isOpen: boolean;
  fileType: "avatar" | "cover";
  onClose: () => void;
  onUpload: (file: File, fileType: "avatar" | "cover") => void;
}

const UploadPhotoModal: React.FC<UploadPhotoModalProps> = ({
  isOpen,
  fileType,
  onClose,
  onUpload,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        
        return () => URL.revokeObjectURL(url);
      }
    };
  
    const handleUpload = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (selectedFile) {
        onUpload(selectedFile, fileType);
        setSelectedFile(null);
        setPreviewUrl(null);
        onClose(); 
      }
    };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="modal-form-photo" onSubmit={handleUpload}>
          <h2>Upload {fileType === "avatar" ? "Avatar" : "Cover Photo"}</h2>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {previewUrl && (
            <div className="image-preview">
              <img
                src={previewUrl}
                alt="Preview"
                className={fileType === "avatar" ? "avatar-preview" : "cover-preview"}
              />
              <p className="file-name">Selected: {selectedFile?.name}</p>
            </div>
          )}
          <div className="modal-actions">
            <Button
              type="submit"
              title="Save"
              className="save-button"
            />
            <Button
              type="button"
              title="Cancel"
              className="cancel-button"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default UploadPhotoModal;
