import React from "react";
// import Navbar from "../components/Navbar";
import "./Home.styles.css";
// import { PostList } from "../components/PostList/PostList";

// const mockPosts = [
//   { id: 1, title: "Hello World", description: "Morning workout complete! 💪" },
//   { id: 2, title: "Happy Life", description: "Drank a protein smoothie 🍓" },
// ];

const Home: React.FC = () => {
  return (
      <div className="home-page">
        <h1>Posts</h1>
        <p>No current posts!</p>
        
        {/* <PostList /> */}
        {/* {mockPosts.length > 0 ? (
          mockPosts.map((post) => (
            <PostCard key={post.id} author={post.title} content={post.description} />
          ))
        ) : (
            <p>No posts yet. Start following people to see their updates!</p>
            )} */}
            {/* <p>No posts yet. Start following people to see their updates!</p> */}
      </div>
  );
};

export default Home;
