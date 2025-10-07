import { useState } from "react";
import { useGetBrandInfoQuery } from "../../redux/features/Brand/brandApi";
import Modal from "../../Components/Modal/Modal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, error } = useGetBrandInfoQuery();

  console.log(error?.status);
  return (
    <div>
      <Modal
        isOpen={error?.status === 400 || isOpen}
        setIsOpen={setIsOpen}
        maxW={"max-w-md"}
      ></Modal>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
