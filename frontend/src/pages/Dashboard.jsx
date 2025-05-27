import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { Bars3Icon } from "@heroicons/react/24/solid";
import PersonalDetailsForm from "../components/PersonalDetailsForm";

const Dashboard = () => {
  // const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get("http://localhost:5555/api/user", {
        withCredentials: true,
      });
    };

    const getCollectionsAndDocuments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/collections",
          {
            withCredentials: true,
          }
        );
        const dbCollections = response.data.collections;
        setCollections(dbCollections);

        const firstCollection = await dbCollections.find(
          (col) => col !== "users"
        );
        if (firstCollection) {
          setActiveCollection(firstCollection);
          getDocumentsForCollection(firstCollection);
        }
      } catch (error) {
        console.log("Failed to load collections", error);
      }
    };

    const getDocumentsForCollection = async (collectionName) => {
      console.log(collectionName);
      try {
        const response = await axios.get(
          `http://localhost:5555/api/${collectionName}/documents`,
          {
            withCredentials: true,
          }
        );

        const documentsForCollection = response.data.documents;
        console.log(documentsForCollection);
        setDocuments(documentsForCollection);
      } catch (error) {
        console.log("Failed to load documents", error);
      }
    };

    getUserData();
    getCollectionsAndDocuments();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const RenderPersonalDetails = () => (
    <PersonalDetailsForm documents={documents} />
  );

  const collectionComponents = {
    personaldetails: RenderPersonalDetails,
  };

  const ActiveComponent = collectionComponents[activeCollection];
  console.log(activeCollection);

  return (
    <div>
      <SideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        stopPropagation={stopPropagation}
        collections={collections}
        documents={documents}
      />
      <div className="min-md:ml-[300px]">
        <Bars3Icon
          className="size-8 md:hidden ml-auto"
          onClick={toggleSidebar}
        />
        <div>{ActiveComponent && <ActiveComponent />}</div>
      </div>
    </div>
  );
};

export default Dashboard;
