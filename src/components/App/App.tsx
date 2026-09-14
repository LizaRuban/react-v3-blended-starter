import Section from "../Section/Section";
import Container from "../Container/Container";
import Form from "../Form/Form";
import {getPhotos} from "../../services/photos";
import toast, {Toaster} from "react-hot-toast";

export default function App() {
  const handleSearch = async (query: string) => {
    try {
      const data = await getPhotos(query);
      console.log(data);
    } catch {
      toast.error("Something went wrong! Please try again!");
    }
  };

  return (
    <>
      <Section>
        <Container>
          <Toaster position="top-center" />
          <Form onSubmit={handleSearch} />
        </Container>
      </Section>
    </>
  );
}
