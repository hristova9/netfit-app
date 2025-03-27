// import React from 'react';
import "./Profile.styles.css";
// import { PostCard } from "../components/PostCard/PostCard";
import useUserProfile from "../hooks/useUserProfile";
import { FaUser } from "react-icons/fa6";
import { FaPen, FaTrash } from "react-icons/fa";
import { useUserEdit } from "../hooks/useUserEdit";
import { useEffect, useState } from "react";
import UserEditModal from "../components/UserEditModal/UserEditModal";
import { UserEdit } from "../models/User.model";
import { useUserDelete } from "../hooks/useUserDelete";
// import { PostList } from '../components/PostList/PostList';

const Profile = () => {
  const { user, loading, error } = useUserProfile();
  const { updateProfile } = useUserEdit();
  const { deleteProfile } = useUserDelete();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState<UserEdit>({
    firstName: "",
    lastName: "",
    description: "",
  });
  
  useEffect(() => {
    if (user) {
      setUpdatedData({
        firstName: user.firstName,
        lastName: user.lastName,
        description: user.description || "",
      });
    }
  }, [user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>No user data available.</p>;


  const handleChange = (updatedFields: {
    firstName: string;
    lastName: string;
    description: string;
  }) => {
    setUpdatedData((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    console.log(updatedData);
    
  };

  const handleUpdateProfile = async (ev: React.FormEvent<HTMLElement>) => {
    ev.preventDefault();

    if (!updatedData) return;
    await updateProfile(user, updatedData);
    setIsModalOpen(false);
  };

  const handleDeleteProfile = async () => {
    if (confirm("Are you sure you want to delete your profile?")) {
      console.log("in profile", user.id);
      
      await deleteProfile(user.id);
      // Redirect or handle UI changes after deletion
    }
  };

  // Sample user data
  // const user = {
  //   name: 'Jane Doe',
  //   avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  //   coverPhoto: 'https://plus.unsplash.com/premium_photo-1700346373090-151ac589b07d?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   bio: 'Fitness enthusiast | Traveler | Blogger',
  // };

  // Sample posts data
  // const posts = [
  //   {
  //     id: 1,
  //     name: "Jane Doe",
  //     avatar: user.avatar,
  //     dateCreated: "March 14, 2025",
  //     title: "Morning Yoga Session",
  //     image:
  //       "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2202&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     description:
  //       "Started my day with a refreshing yoga session. Feeling energized!",
  //   },
  // ];

  return (
    <div className="profile-page">
      <div
        className="cover-photo-container"
        style={{
          backgroundColor: user.cover || "#C4E3CB",
        }}
      ></div>

      <div className="profile-actions">
        <button className="edit-profile" onClick={() => setIsModalOpen(true)}>
          <FaPen /> Edit
        </button>
        <button className="delete-profile" onClick={handleDeleteProfile}>
          <FaTrash /> Delete
        </button>
      </div>
      <div className="profile-section">
        <div className="avatar-container">
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" className="avatar" />
          ) : (
            <FaUser className="avatar-icon" />
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
        userData={updatedData}
        onSave={handleUpdateProfile}
        onChange={handleChange}
      />
    </div>
  );
};

export default Profile;
