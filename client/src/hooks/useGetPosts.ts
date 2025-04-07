import { useSelector, useDispatch } from "react-redux";
import { useGetAllPostsQuery } from "../store/posts/postsApi";
import { setPosts } from "../store/posts/postsSlice";
import { RootState } from "../store/store";
import { useEffect } from "react";

const useGetPosts = () => {
  const dispatch = useDispatch();
  const postsFromStore = useSelector((state: RootState) => state.posts.posts);

  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = useGetAllPostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (posts && JSON.stringify(posts) !== JSON.stringify(postsFromStore)) {
      dispatch(setPosts(posts));
    }
  }, [posts, postsFromStore, dispatch]);

  if (error) {
    return { posts: null, loading: false, error: (error as Error).message };
  }

  return {
    posts: postsFromStore.length > 0 ? postsFromStore : posts,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
};

export default useGetPosts;
