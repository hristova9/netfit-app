// import { useSelector, useDispatch } from "react-redux";
import { useGetPostsByUserIdQuery } from "../store/posts/postsApi";
// import { setPostsByUser } from "../store/posts/postsSlice";
// import { RootState } from "../store/store";
// import { useEffect } from "react";

const useGetPostsByUser = (userId: string) => {
//   const dispatch = useDispatch();
//   const postsFromStore = useSelector((state: RootState) => state.posts.postsByUser[userId]);
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = useGetPostsByUserIdQuery(userId, {
    refetchOnMountOrArgChange: true,
    skip: !userId
  });

//   useEffect(() => {
//     if (posts && JSON.stringify(posts) !== JSON.stringify(postsFromStore)) {
//         dispatch(setPostsByUser({ userId, posts }));
//     }
//   }, [posts, postsFromStore, dispatch, userId]);

  if (error) {
    return { posts: null, loading: false, error: (error as Error).message };
  }

  return {
    // posts: postsFromStore.length > 0 ? postsFromStore : posts || [],
    posts: posts,
    loading: isLoading,
    error: error ? (error as Error).message : null,
    refetch,
  };
};

export default useGetPostsByUser;