import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import type { Post, NewPostProps } from "../../types/post";
import { editPost } from "../../services/postService";
import css from "./EditPostForm.module.css";

interface EditPostFormProps {
  post: Post;
  onClose: () => void;
}

export default function EditPostForm({ post, onClose }: EditPostFormProps) {
  const queryClient = useQueryClient();

  const postSchema = Yup.object({
    title: Yup.string()
      .min(3, "At least 3 characters")
      .max(50, "No more than 50 characters")
      .required("Title is required"),
    body: Yup.string().max(500, "No more than 500 characters").required("Content is required"),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: editPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post edited successfully!");
      onClose();
    },
  });

  const initialValues: NewPostProps = {
    title: post.title,
    body: post.body,
  };

  const handleSubmit = (values: NewPostProps) => {
    mutate({
      postId: Number(post.id),
      newDataPost: values,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={postSchema}
      enableReinitialize
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows={8} className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className={css.submitButton} disabled={isPending}>
            {isPending ? "Saving..." : "Edit post"}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
