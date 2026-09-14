import GridItem from "../GridItem/GridItem";
import type {Photo} from "../../types/photo";
import styles from "./PhotosGalleryItem.module.css";

interface PhotosGalleryItemProp {
  photo: Photo;
  onSelect: (photo: Photo) => void;
}

export default function PhotosGalleryItem({
  photo,
  onSelect,
}: PhotosGalleryItemProp) {
  return (
    <GridItem>
      <div
        className={styles.thumb}
        style={{
          backgroundColor: photo.avg_color,
          borderColor: photo.avg_color,
        }}>
        <img
          onClick={() => onSelect(photo)}
          src={photo.src.large}
          alt={photo.alt}
        />
      </div>
    </GridItem>
  );
}
