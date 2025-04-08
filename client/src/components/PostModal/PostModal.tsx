import React from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./PostModal.css";
import { FaXmark } from "react-icons/fa6";

interface PostModalProps {
  isOpen: boolean;
  mode: "create" | "edit";
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLElement>) => Promise<void>;
  onChange: (updatedData: { description: string; photo?: File }) => void;
  postData: {
    description: string;
    photo?: File;
  };
  previewUrl?: string | null;
  onRemovePhoto: () => void;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  mode,
  onClose,
  onSubmit,
  onChange,
  postData,
  previewUrl,
  onRemovePhoto,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || undefined;
    onChange({ ...postData, photo: file });
  };

  const handleCancel = () => {
    onChange({ description: "", photo: undefined });
    onClose();
  };

  const handleRemovePhoto = () => {
    onChange({ ...postData, photo: undefined });
    onRemovePhoto();
  };

  if (!isOpen) return null;

  const isEditing = mode === "edit";

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="modal-form" onSubmit={onSubmit}>
          <h2 className="modal-title">
            {isEditing ? "Edit Post" : "Create Post"}
          </h2>

          <div className="modal-input-fields">
            <Input
              label="What's on your mind?"
              type="text"
              name="description"
              value={postData.description}
              onChange={(e) =>
                onChange({ ...postData, description: e.target.value })
              }
              placeholder="Write something..."
            />

            <div className="post-image-container-modal">
              <label htmlFor="photo">
                {isEditing ? "Change Photo" : "Choose a Photo"}
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="post-image-input"
                onChange={handleFileChange}
              />
            </div>

            {previewUrl && (
              <div className="post-image-preview">
                <div className="post-image-preview-header">
                  <p className="post-file-name">Selected: {postData.photo?.name}</p>
                  <button type="button"
                    title="Remove Photo"
                    className="remove-button" onClick={handleRemovePhoto}>
                        <FaXmark />
                    </button>
                </div>
                <img src={previewUrl} alt="Preview" className="post-image" />
              </div>
            )}
          </div>

          <div className="modal-actions">
            <Button
              type="submit"
              title={isEditing ? "Save" : "Post"}
              className="save-button"
            />
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

export default PostModal;
