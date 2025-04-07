import "./Profile.styles.css";
// import { PostCard } from "../components/PostCard/PostCard";
import useUserProfile from "../hooks/useUserProfile";
import { FaUser } from "react-icons/fa6";
import { FaCamera, FaPen } from "react-icons/fa";
import { useUserEdit } from "../hooks/useUserEdit";
import { useState } from "react";
import UserEditModal from "../components/UserEditModal/UserEditModal";
import { useDispatch } from "react-redux";
import { setUser, updateUserInList } from "../store/users/usersSlice";
import UploadPhotoModal from "../components/UploadPhotoModal/UploadPhotoModal";
import { useUploadPhoto } from "../hooks/useUploadPhoto";

const Profile: React.FC = () => {
  const {
    user,
    loading: isUserLoading,
    error: userError,
    refetch,
    isOwnProfile
  } = useUserProfile();
  const { formData, handleChange, updateProfile } = useUserEdit(user);
  const { uploadPhoto } = useUploadPhoto();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPhotoOpen, setIsModalPhotoOpen] = useState(false);
  const [fileType, setFileType] = useState<"avatar" | "cover" | null>(null);
  const dispatch = useDispatch();

  if (isUserLoading) return <p>Loading...</p>;
  if (userError) return <p>{userError}</p>;
  if (!user) return <p>No user data available.</p>;

  const handleUpdateProfile = async (ev: React.FormEvent<HTMLElement>) => {
    ev.preventDefault();
    if (!isOwnProfile) return;
    const updatedUser = await updateProfile();
    if (updatedUser) {
      dispatch(setUser(updatedUser));
      dispatch(updateUserInList(updatedUser));
      refetch();
      setIsModalOpen(false);
    }
  };

  const openUploadModal = (type: "avatar" | "cover") => {
    setFileType(type);
    setIsModalPhotoOpen(true);
  };

  const handleFileUpload = async (file: File, fileType: "avatar" | "cover") => {
    if (!user || !isOwnProfile) return;

    const success = await uploadPhoto(user, file, fileType);

    if (success) {
      const updatedUser = {
        ...user,
        [fileType]: success,
      };

      dispatch(setUser(updatedUser));
      refetch();
      setIsModalPhotoOpen(false);
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
      {isOwnProfile && (
          <button className="edit-profile" onClick={() => setIsModalOpen(true)}>
            <FaPen /> Edit
          </button>
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

      {/* <div className="feed-section">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div> */}

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
