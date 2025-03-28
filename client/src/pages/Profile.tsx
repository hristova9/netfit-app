// import React from 'react';
import "./Profile.styles.css";
// import { PostCard } from "../components/PostCard/PostCard";
import useUserProfile from "../hooks/useUserProfile";
import { FaUser } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { useUserEdit } from "../hooks/useUserEdit";
import { useEffect, useState } from "react";
import UserEditModal from "../components/UserEditModal/UserEditModal";
import { UserEdit } from "../models/User.model";
import { useDispatch } from "react-redux";
import { setUser } from "../store/usersSlice";

const Profile: React.FC = () => {
  const {
    user,
    loading: isUserLoading,
    error: userError,
    refetch,
  } = useUserProfile();
  const { updateProfile } = useUserEdit();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedData, setUpdatedData] = useState<UserEdit>({
    firstName: "",
    lastName: "",
    description: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      setUpdatedData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        description: user.description || "",
      });
    }
  }, [user]);

  if (isUserLoading) return <p>Loading...</p>;
  if (userError) return <p>{userError}</p>;
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
    dispatch(setUser({ ...user, ...updatedData }));
    refetch();
    setIsModalOpen(false);
  };

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
