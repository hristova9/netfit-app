import React, { useState } from "react";
import "./Home.styles.css";
import { PostList } from "../components/PostList/PostList";
import useGetPosts from "../hooks/useGetPosts";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Post } from "../models/Post.model";
import PostModal from "../components/PostModal/PostModal";
import { usePostCreate } from "../hooks/usePostCreate";
import { usePostEdit } from "../hooks/usePostEdit";
import { usePostDelete } from "../hooks/usePostDelete";

const Home: React.FC = () => {
  const { posts, loading, error } = useGetPosts();
  const loggedInUser = useSelector(
    (state: RootState) => state.users.loggedInUser
  );

  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [formData, setFormData] = useState<{
    description: string;
    photo?: File;
  }>({
    description: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { createNewPost } = usePostCreate();
  const { editPost } = usePostEdit();
  const { deletePost} = usePostDelete();

  const handleChange = (
    updatedFields: Partial<{ description: string; photo?: File }>
  ) => {
    setFormData((prev) => {
      const newData = { ...prev, ...updatedFields };
      if (updatedFields.photo instanceof File) {
        setPreviewUrl(URL.createObjectURL(updatedFields.photo));
      }
      return newData;
    });
  };

  const openCreateModal = () => {
    setModalMode("create");
    setFormData({ description: "" });
    setPreviewUrl("");
    setEditingPost(null);
    setIsModalOpen(true);
  };

  const openEditModal = (post: Post) => {
    if (loggedInUser?.id !== post.ownerId) {
      alert("You are not allowed to edit this post.");
      return;
    }

    setModalMode("edit");
    setFormData({ description: post.description });
    setPreviewUrl(post.photo || null);
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({ description: "" });
    setPreviewUrl("");
    setEditingPost(null);
  };

  const handleRemovePhoto = () => {
    setFormData((prevData) => ({
      ...prevData,
      photo: undefined,
    }));
    
    setPreviewUrl("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggedInUser) return;

    if (modalMode === "create") {
      const success = await createNewPost(loggedInUser, formData);
      if (success) closeModal();
    } else if (modalMode === "edit" && editingPost) {
      const success = await editPost(editingPost, formData);
      if (success) closeModal();
    }
  };

  const handleDelete = async (postId: string) => {
    const success = await deletePost(postId);
    if (success) {
      console.log("Post successfully deleted!");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-page">
      <div className="home-header-container">
        <div className="home-header">
          <h1>Community Posts</h1>
          <p>
            Explore what people are sharing — thoughts, photos, ideas and more!
          </p>
        </div>
        <div className="home-header-actions">
          <button className="add-post-button" onClick={openCreateModal}>
            <FaPlus />
          </button>
        </div>
      </div>

      {posts?.length === 0 && <p>No current posts!</p>}
      {posts && (
        <PostList
          posts={posts}
          onEdit={openEditModal}
          onDelete={handleDelete}
          currentUserId={loggedInUser?.id}
        />
      )}

      <PostModal
        isOpen={isModalOpen}
        mode={modalMode}
        onClose={closeModal}
        onSubmit={handleSubmit}
        onChange={handleChange}
        postData={formData}
        previewUrl={previewUrl}
        onRemovePhoto={handleRemovePhoto}
      />
    </div>
  );
};

export default Home;
