import {FiSearch} from "react-icons/fi";
import toast, {Toaster} from "react-hot-toast";

import style from "./Form.module.css";

interface FormProps {
  onSubmit: (query: string) => void;
}

export default function Form({onSubmit}: FormProps) {
  const handleSubmit = (formData: FormData) => {
    const rowData = formData.get("search") as string;
    if (rowData.trim() === null) {
      toast.error("Please enter your search query");
      return;
    }
    onSubmit(rowData);
  };
  return (
    <form className={style.form} action={handleSubmit}>
      <input
        className={style.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={style.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
