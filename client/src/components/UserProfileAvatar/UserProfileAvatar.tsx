// import React from 'react';

interface Avatar {
    name: string;
    avatarUrl: string;
}

const UserProfileAvatar: React.FC<Avatar> = ({ name, avatarUrl }) => {
  return <img src={avatarUrl} alt={`${name}'s avatar`} className="avatar" />;
};

export default UserProfileAvatar;

