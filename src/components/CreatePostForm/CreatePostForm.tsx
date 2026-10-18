import * as Yup from "yup";
import { Field, Form, Formik, ErrorMessage } from "formik";

import css from "./CreatePostForm.module.css";
import type { NewPostProps } from "../../types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../../services/postService";

const initialValues: NewPostProps = {
  title: "",
  body: "",
};

type PostFormProps = {
  onClose: () => void;
};

export default function PostForm({ onClose }: PostFormProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      alert("Post sucessfully created");
      onClose();
    },
  });

  const handleSubmit = (values: NewPostProps) => {
    mutate(values);
  };

  const postShecma = Yup.object().shape({
    title: Yup.string()
      .min(3, "At least 3 characters")
      .max(50, "No more than 50 characters")
      .required("Title is requireds"),
    body: Yup.string().max(500, "No more than 500 characters").required("Content is requireds"),
  });

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={postShecma}>
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="body">Content</label>
          <Field id="body" as="textarea" name="body" rows="8" className={css.textarea} />
          <ErrorMessage name="body" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={isPending}>
            Create post
          </button>
        </div>
      </Form>
    </Formik>
  );
}
