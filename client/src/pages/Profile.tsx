// import React from 'react';
import './Profile.styles.css';
import {PostCard} from '../components/PostCard/PostCard';
// import { PostList } from '../components/PostList/PostList';

const Profile = () => {
  // Sample user data
  const user = {
    name: 'Jane Doe',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    coverPhoto: 'https://plus.unsplash.com/premium_photo-1700346373090-151ac589b07d?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    bio: 'Fitness enthusiast | Traveler | Blogger',
  };

  // Sample posts data
  const posts = [
    {
      id: 1,
      name: 'Jane Doe',
      avatar: user.avatar,
      dateCreated: 'March 14, 2025',
      title: 'Morning Yoga Session',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2202&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Started my day with a refreshing yoga session. Feeling energized!',
    },
    // Add more posts as needed
  ];

  return (
    <div className="profile-page">
      {/* Cover Photo */}
      <div className="cover-photo-container">
        <img src={user.coverPhoto} alt="Cover" className="cover-photo" />
      </div>

      {/* Profile Section */}
      <div className="profile-section">
        <div className="avatar-container">
          <img src={user.avatar} alt="Avatar" className="avatar" />
        </div>
        <h1 className="user-name">{user.name}</h1>
        <p className="user-bio">{user.bio}</p>
      </div>

      {/* Feed Section */}
      <div className="feed-section">
        {/* <PostList /> */}
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
