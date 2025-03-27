import { useState, useEffect } from 'react';
import { User } from '../models/User.model';
import { getMyself } from '../services/userService';

const useUserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
//   const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userData = await getMyself();
        // const postsData: Post[] = await postsResponse.json();
        
        setUser(userData);
        // setPosts(postsData);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (user) {
      console.log("Updated user:", user);
    }
  }, [user]);


  return { user, loading, error };
};

export default useUserProfile;
