import css from "./SearchBox.module.css";

interface SearchBoxProps {
  value: string;
  onSearch: (value: string) => void;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
  return (
    <input
      value={value}
      className={css.input}
      type="text"
      placeholder="Search posts"
      onChange={(event) => onSearch(event.target.value)}
    />
  );
}
