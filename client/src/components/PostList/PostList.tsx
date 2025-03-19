import { PostCard } from "../PostCard/PostCard";
import "./PostList.styles.css";

export const PostList = () => {
  return (
    <div className="post-list-container">
      <ul className="post-list">
        <PostCard
          name="John Doe"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
          dateCreated="March 14, 2025"
          title="Enjoying the sunset at the beach! 🌅"
          image="https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          description="Had a great time at the beach today! The sunset was absolutely breathtaking. 🌊☀️"
        />
        <PostCard
          name="John Doe"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
          dateCreated="March 14, 2025"
          title="Enjoying the sunset at the beach! 🌅"
          image="https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          description="Had a great time at the beach today! The sunset was absolutely breathtaking. 🌊☀️"
        />
        <PostCard
          name="John Doe"
          avatar="https://randomuser.me/api/portraits/men/1.jpg"
          dateCreated="March 14, 2025"
          title="Enjoying the sunset at the beach! 🌅"
          image="https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          description="Had a great time at the beach today! The sunset was absolutely breathtaking. 🌊☀️"
        />
      </ul>
    </div>
  );
};
