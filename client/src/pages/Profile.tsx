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
import { PostList } from "../components/PostList/PostList";
import useGetPostsByUser from "../hooks/useGetPostsByUser";
import { Post } from "../models/Post.model";
import { usePostCreate } from "../hooks/usePostCreate";
import { usePostEdit } from "../hooks/usePostEdit";
import { usePostDelete } from "../hooks/usePostDelete";
import PostModal from "../components/PostModal/PostModal";

const Profile: React.FC = () => {
  const { user, loading: isUserLoading, isOwnProfile } = useUserProfile();
  const { startConversation } = useCreateConversation();
  const { formData, handleChange, updateProfile } = useUserEdit(user);
  const { posts } = useGetPostsByUser(user?.id || "");
  const { uploadPhoto } = useUploadPhoto();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPhotoOpen, setIsModalPhotoOpen] = useState(false);
  const [fileType, setFileType] = useState<"avatar" | "cover" | null>(null);

  const [modalModePost, setModalModePost] = useState<"create" | "edit">(
    "create"
  );
  const [isModalOpenPost, setIsModalOpenPost] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formDataPost, setFormDataPost] = useState<{
    description: string;
    photo?: File;
  }>({
    description: "",
  });
  const [previewUrlPost, setPreviewUrlPost] = useState<string>("");

  const { createNewPost } = usePostCreate();
  const { editPost } = usePostEdit();
  const { deletePost } = usePostDelete();

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

    const success = await uploadPhoto(user, file, fileType);

    if (success) {
      const updatedUser = {
        ...user,
        [fileType]: success,
      };
      // await refetch();
      console.log(updatedUser);
      // dispatch(setLoggedInUser(updatedUser));
      setIsModalPhotoOpen(false);
    }
  };

  const handleMessageButton = async () => {
    const conversation = await startConversation(user.id);
    if (conversation) {
      navigate(`/chats/${conversation.id}`);
    }
  };

  const handleChangePost = (
    updatedFields: Partial<{ description: string; photo?: File }>
  ) => {
    setFormDataPost((prev) => {
      const newData = { ...prev, ...updatedFields };
      if (updatedFields.photo instanceof File) {
        setPreviewUrlPost(URL.createObjectURL(updatedFields.photo));
      }
      return newData;
    });
  };

  // const openCreateModalPost = () => {
  //   setModalModePost("create");
  //   setFormDataPost({ description: "" });
  //   setPreviewUrlPost("");
  //   setEditingPost(null);
  //   setIsModalOpenPost(true);
  // };

  const openEditModalPost = (post: Post) => {
    if (user?.id !== post.ownerId) {
      alert("You are not allowed to edit this post.");
      return;
    }

    setModalModePost("edit");
    setFormDataPost({ description: post.description });
    setPreviewUrlPost(post?.photo || "");
    setEditingPost(post);
    setIsModalOpenPost(true);
  };

  const closeModalPost = () => {
    setIsModalOpenPost(false);
    setFormDataPost({ description: "" });
    setPreviewUrlPost("");
    setEditingPost(null);
  };

  const handleRemovePhotoPost = () => {
    setFormDataPost((prevData) => ({
      ...prevData,
      photo: undefined,
    }));

    setPreviewUrlPost("");
  };

  const handleSubmitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    if (modalModePost === "create") {
      const success = await createNewPost(user, formData);
      if (success) closeModalPost();
    } else if (modalModePost === "edit" && editingPost) {
      const success = await editPost(previewUrlPost, editingPost, formData);
      if (success) closeModalPost();
    }
  };

  const handleDeletePost = async (postId: string) => {
    const success = await deletePost(postId);
    if (success) {
      console.log("Post successfully deleted!");
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
      {posts && posts.length > 0 ? (
        <PostList
          posts={posts}
          onEdit={openEditModalPost}
          onDelete={handleDeletePost}
          currentUserId={user.id}
        />
      ) : (
        <p>No posts yet!</p>
      )}
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
      <PostModal
        isOpen={isModalOpenPost}
        mode={modalModePost}
        onClose={closeModalPost}
        onSubmit={handleSubmitPost}
        onChange={handleChangePost}
        postData={formDataPost}
        previewUrl={previewUrlPost}
        onRemovePhoto={handleRemovePhotoPost}
      />
    </div>
  );
};

export default Profile;
