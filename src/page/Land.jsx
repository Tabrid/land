import { FaGlobe } from "react-icons/fa";
import Table from "./Table";

const Land = () => {
  return (
    <div className="border-2 border-blue-500 rounded-md mx-3 mt-5 sm:w-full ">
      <div
        className="flex flex-row justify-between h-10 items-center"
        style={{ backgroundColor: "#4B8DF8" }}
      >
        <a
          className="flex flex-row justify-center items-center gap-2 text-white text-xs"
          style={{ marginLeft: "10px" }}
        >
          <FaGlobe />
          ভূমি উন্নয়ন কর পরিশোধ রসিদ
        </a>
      </div>
      <div className="bg-white">
        <Table></Table>
      </div>
    </div>
  );
};

export default Land;
