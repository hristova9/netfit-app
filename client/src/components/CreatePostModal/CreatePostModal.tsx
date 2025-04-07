import React from "react";
import Input from "../Input/Input";
import "./CreatePostModal.css";
import Button from "../Button/Button";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPost: (ev: React.FormEvent<HTMLElement>) => Promise<void>;
  onChange: (updatedData: { description: string; photo?: File }) => void;
  postData: {
    description: string;
    photo?: File;
  };
  previewUrl?: string | null;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  onPost,
  onChange,
  postData,
  previewUrl
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || undefined;
        onChange({ ...postData, photo: file });
      };
    
      const handleCancel = () => {
        onChange({ description: "", photo: undefined });
        onClose();
      };
    

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="modal-form-create" onSubmit={onPost}>
          <h2 className="modal-title">Create Post</h2>

          <div className="modal-input-fields">
            <Input
              label="What's on your mind?"
              type="text"
              name="description"
              value={postData.description}
              onChange={(e) => onChange({ ...postData, description: e.target.value })}
              placeholder="Write something..."
            />
            <div className="create-post-image-container">
              <label htmlFor="photo">Choose a photo</label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="create-post-image-input"
                onChange={handleFileChange}
              />
            </div>

            {previewUrl && (
              <div className="create-post-image-preview">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="create-post-image"
                />
                <p className="file-name">Selected: {postData.photo?.name}</p>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <Button type="submit" title="Post" className="save-button" />
            <Button
              type="button"
              title="Cancel"
              className="cancel-button"
              onClick={handleCancel}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostModal;
