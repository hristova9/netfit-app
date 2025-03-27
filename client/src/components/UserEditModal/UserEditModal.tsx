import React from "react";
import Input from "../Input/Input";
import { UserEdit } from "../../models/User.model";
import "./UserEditModal.css";
import Button from "../Button/Button";

interface UserEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserEdit;
  onSave: (ev: React.FormEvent<HTMLElement>) => Promise<void>;
  onChange: (updatedData: {
    firstName: string;
    lastName: string;
    description: string;
  }) => void;
}

const UserEditModal: React.FC<UserEditModalProps> = ({
  isOpen,
  onClose,
  userData,
  onSave,
  onChange,
}) => {
  if (!isOpen) return;
  console.log(userData);
  

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="modal-form-edit" onSubmit={onSave}>
          <h2 className="modal-title">Edit Profile</h2>

          <div className="modal-input-fields">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={(e) =>
                onChange({ ...userData, firstName: e.target.value })
              }
              placeholder={userData.firstName}
            />

            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={(e) =>
                onChange({ ...userData, lastName: e.target.value })
              }
              placeholder={userData.lastName}
            />
            <Input
              label="Description"
              type="text"
              name="description"
              value={userData.description}
              onChange={(e) =>
                onChange({ ...userData, description: e.target.value })
              }
              placeholder={userData.description}
            />
          </div>

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
  );
};

export default UserEditModal;
