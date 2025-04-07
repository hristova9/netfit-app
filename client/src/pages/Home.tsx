import React, { useState } from "react";
import "./Home.styles.css";
import { PostList } from "../components/PostList/PostList";
import useGetPosts from "../hooks/useGetPosts";
import { FaPlus } from "react-icons/fa";
import CreatePostModal from "../components/CreatePostModal/CreatePostModal";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { usePostCreate } from "../hooks/usePostCreate";

const Home: React.FC = () => {
  const { posts, loading, error } = useGetPosts();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState<{
    description: string;
    photo?: File;
  }>({ description: "" });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { createNewPost } = usePostCreate();
  const currentUser = useSelector((state: RootState) => state.users.user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("click save");
    console.log(currentUser);
    
    if (!currentUser) return;

    const success = await createNewPost(currentUser, formData);
    if (success) {
      setFormData({ description: "" });
      setPreviewUrl(null);
      setShowCreateModal(false);
    }
  };

  return (
    <div className="home-page">
      <div className="home-header-container ">
        <div className="home-header">
          <h1>Community Posts</h1>
          <p>
            Explore what people are sharing — thoughts, photos, ideas and more!
          </p>
        </div>
        <div className="home-header-actions">
          <button
            className="add-post-button"
            onClick={() => setShowCreateModal(true)}
          >
            <FaPlus />
          </button>
        </div>
      </div>
      {loading && <p>Loading posts...</p>}
      {!loading && !error && posts?.length === 0 && <p>No current posts!</p>}

      {!loading && !error && posts && <PostList posts={posts} />}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPost={handlePost}
        onChange={handleChange}
        postData={formData}
        previewUrl={previewUrl}
      />
    </div>
  );
};

export default Home;
