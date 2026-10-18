import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Post } from "../../types/post";
import css from "./PostList.module.css";
import { deletePost } from "../../services/postService";
import { useState } from "react";
import Modal from "../Modal/Modal";
import EditPostForm from "../EditPostForm/EditPostForm";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const queryClient = useQueryClient();

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post successfully deleted");
    },
  });

  return (
    <>
      <ul className={css.list}>
        {posts.map(({ id, title, body }) => (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{body}</p>

            <div className={css.footer}>
              <button className={css.edit} onClick={() => setSelectedPost({ id, title, body })}>
                Edit
              </button>

              <button className={css.delete} onClick={() => deleteMutate(Number(id))}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedPost && (
        <Modal onClose={() => setSelectedPost(null)}>
          <EditPostForm post={selectedPost} onClose={() => setSelectedPost(null)} />
        </Modal>
      )}
    </>
  );
}
