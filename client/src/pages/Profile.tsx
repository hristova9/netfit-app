import "./Profile.styles.css";
import useUserProfile from "../hooks/useUserProfile";
import { FaUser } from "react-icons/fa6";
import { FaCamera, FaPen } from "react-icons/fa";
import { useUserEdit } from "../hooks/useUserEdit";
import { useState } from "react";
import UserEditModal from "../components/UserEditModal/UserEditModal";
import { useDispatch } from "react-redux";
import { setLoggedInUser, updateUserInList } from "../store/users/usersSlice";
import UploadPhotoModal from "../components/UploadPhotoModal/UploadPhotoModal";
import { useUploadPhoto } from "../hooks/useUploadPhoto";
import Button from "../components/Button/Button";
import { useCreateConversation } from "../hooks/useCreateConversation";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { user, loading: isUserLoading, isOwnProfile, refetch } = useUserProfile();
  const { startConversation } = useCreateConversation();

  const { formData, handleChange, updateProfile } = useUserEdit(user);
  const { uploadPhoto } = useUploadPhoto();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPhotoOpen, setIsModalPhotoOpen] = useState(false);
  const [fileType, setFileType] = useState<"avatar" | "cover" | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isUserLoading) return <p>Loading...</p>;
  if (!user) return <p>No user data available.</p>;

  const handleUpdateProfile = async (ev: React.FormEvent<HTMLElement>) => {
    ev.preventDefault();
    if (!isOwnProfile) return;
    const updatedUser = await updateProfile();
    if (updatedUser) {
      dispatch(setLoggedInUser(updatedUser));
      dispatch(updateUserInList(updatedUser));
      setIsModalOpen(false);
    }
  };
  

  const openUploadModal = (type: "avatar" | "cover") => {
    setFileType(type);
    setIsModalPhotoOpen(true);
  };

  const handleFileUpload = async (file: File, fileType: "avatar" | "cover") => {
    if (!user || !isOwnProfile) return;

  console.log(user);

    const success = await uploadPhoto(user, file, fileType);

    if (success) {
      const updatedUser = {
        ...user,
        [fileType]: success,
      };
      await refetch();
      console.log(updatedUser);
      
      // dispatch(setLoggedInUser(updatedUser));
      setIsModalPhotoOpen(false);
    }
  };

  const handleMessageButton = async () => {
    const conversation = await startConversation(user.id);
    if (conversation) {
      console.log(conversation);
      navigate(`/chats/${conversation.id}`);
    }
  };

  return (
    <div className="profile-page">
      <div
        className="cover-photo-container"
        style={{
          backgroundImage:
            typeof user.cover === "string" ? `url(${user.cover})` : undefined,
        }}
      >
        {isOwnProfile && (
          <div className="camera-icon" onClick={() => openUploadModal("cover")}>
            <FaCamera />
          </div>
        )}
      </div>

      <div className="profile-actions">
        {isOwnProfile ? (
          <button className="edit-profile" onClick={() => setIsModalOpen(true)}>
            <FaPen /> Edit
          </button>
        ) : (
          <Button
            type="button"
            title="Message"
            onClick={handleMessageButton}
            className="message-button"
          />
        )}
      </div>
      <div className="profile-section">
        <div className="avatar-container">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" className="avatar" />
          ) : (
            <FaUser className="avatar-icon" />
          )}
          {isOwnProfile && (
            <div
              className="camera-icon"
              onClick={() => openUploadModal("avatar")}
            >
              <FaCamera />
            </div>
          )}
        </div>
        <h1 className="user-name">
          {user.firstName} {user.lastName}
        </h1>
        <p className="user-bio">{user.description}</p>
      </div>
      <UserEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userData={formData}
        onSave={handleUpdateProfile}
        onChange={handleChange}
      />
      <UploadPhotoModal
        isOpen={isModalPhotoOpen}
        fileType={fileType as "avatar" | "cover"}
        onClose={() => setIsModalPhotoOpen(false)}
        onUpload={handleFileUpload}
      />
    </div>
  );
};

export default Profile;
