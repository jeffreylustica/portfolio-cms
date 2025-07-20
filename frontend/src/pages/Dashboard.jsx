import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { Bars3Icon } from "@heroicons/react/24/solid";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import ProjectsForm from "../components/ProjectsForm";
import SkillsForm from "../components/skillsForm";
import ExperienceForm from "../components/ExperienceForm";
import FilesForm from "../components/FilesForm";
import Spinner from "../components/Spinner";

const Dashboard = () => {
  // const token = localStorage.getItem("token");
  const [user, setUser] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get("http://localhost:5555/api/user", {
        withCredentials: true,
      });
    };

    getUserData();
    getCollections();
  }, []);

  const getCollections = async () => {
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
    setIsDocumentsLoading(true);
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
      setIsDocumentsLoading(false);
      setIsFormLoading(false);
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

  // const RenderPersonalDetails = () => (
  //   <PersonalDetailsForm activeDocument={activeDocument} />
  // );

  // const RenderProjects = () => <ProjectsForm activeDocument={activeDocument} />;

  // const collectionComponents = {
  //   personaldetails: RenderPersonalDetails,
  //   projects: RenderProjects,
  // };

  const renderFormComponent = () => {
    const sharedProps = {
      activeDocument,
      onSave: handleSave,
      onDelete: handleDelete,
      isFormLoading,
      setIsFormLoading,
    };

    switch (activeCollection) {
      case "personaldetails":
        return <PersonalDetailsForm {...sharedProps} />;
      case "projects":
        return <ProjectsForm {...sharedProps} />;
      case "skills":
        return <SkillsForm {...sharedProps} />;
      case "experiences":
        return <ExperienceForm {...sharedProps} />;
      case "files":
        return <FilesForm {...sharedProps} />;
      default:
        return <div>No form available for this collection.</div>;
    }
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

  const handleSave = (updatedDoc) => {
    setDocuments((prevDocs) => {
      const existing = prevDocs.find((doc) => doc._id === updatedDoc._id);
      if (existing) {
        return prevDocs.map((doc) =>
          doc._id === updatedDoc._id ? updatedDoc : doc
        );
      } else {
        return [...prevDocs, updatedDoc];
      }
    });

    setActiveDocument(updatedDoc);
    setIsDocumentsLoading(false);
  };

  console.log(documents);

  const handleDelete = (deletedId) => {
    setDocuments((prevDocs) => {
      const updatedDocs = prevDocs.filter((doc) => doc._id !== deletedId);
      if (updatedDocs.length > 0) {
        setActiveDocument(updatedDocs[updatedDocs.length - 1]);
      } else {
        setActiveDocument({ _id: "new" });
      }

      return updatedDocs;
    });
  };

  // const ActiveComponent = collectionComponents[activeCollection];

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
        isDocumentsLoading={isDocumentsLoading}
      />
      <div className="min-md:ml-[300px] relative">
        {isDocumentsLoading && <Spinner />}
        <Bars3Icon
          className="size-8 md:hidden ml-auto"
          onClick={toggleSidebar}
        />
        <div>{renderFormComponent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
