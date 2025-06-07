import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { Bars3Icon } from "@heroicons/react/24/solid";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import ProjectsForm from "../components/ProjectsForm";

const Dashboard = () => {
  // const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get("http://localhost:5555/api/user", {
        withCredentials: true,
      });
    };

    getUserData();
    getCollectionsAndDocuments();
  }, []);

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
    try {
      const response = await axios.get(
        `http://localhost:5555/api/${collectionName}/documents`,
        {
          withCredentials: true,
        }
      );

      const documentsForCollection = response.data.documents;
      setDocuments(documentsForCollection);
      setActiveDocument(documentsForCollection[0]);
    } catch (error) {
      console.log("Failed to load documents", error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const RenderPersonalDetails = () => (
    <PersonalDetailsForm activeDocument={activeDocument} />
  );

  const RenderProjects = () => {
    <ProjectsForm />;
  };

  const collectionComponents = {
    personaldetails: RenderPersonalDetails,
    projects: RenderProjects,
  };

  const changeActiveDocument = (id) => {
    if (id === "new") {
      setActiveDocument({ _id: "new" });
    } else {
      const selectedDoc = documents.find((doc) => doc._id === id);
      if (selectedDoc) {
        setActiveDocument(selectedDoc);
      }
    }
  };

  const changeActiveCollection = (name) => {
    setActiveCollection(name);
    getDocumentsForCollection(name);
  };

  const ActiveComponent = collectionComponents[activeCollection];

  return (
    <div>
      <SideBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        stopPropagation={stopPropagation}
        collections={collections}
        documents={documents}
        changeActiveDocument={changeActiveDocument}
        changeActiveCollection={changeActiveCollection}
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
