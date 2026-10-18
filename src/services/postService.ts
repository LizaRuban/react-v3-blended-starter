import axios from "axios";
import type { NewPostProps, Post } from "../types/post";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

interface FetchPostsProps {
  posts: Post[];
  totalCount: number;
}

export const fetchPosts = async (searchText: string, page: number): Promise<FetchPostsProps> => {
  const response = await axios.get<Post[]>("/posts", {
    params: {
      q: searchText,
      _page: page,
      _limit: 8,
    },
  });
  const totalCount = Number(response.headers["x-total-count"]);
  return { posts: response.data, totalCount };
};

export const createPost = async (newPost: NewPostProps): Promise<Post> => {
  const { data } = await axios.post<Post>("posts", { newPost });
  return data;
};

export const editPost = async ({
  postId,
  newDataPost,
}: {
  postId: number;
  newDataPost: NewPostProps;
}): Promise<Post> => {
  const { data } = await axios.put<Post>(`/posts/${postId}`, newDataPost);
  return data;
};

export const deletePost = async (postId: number): Promise<Post> => {
  const { data } = await axios.delete<Post>(`/posts/${postId}`);
  return data;
};
