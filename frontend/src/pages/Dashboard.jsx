import { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import axios from "axios";
import { Bars3Icon } from "@heroicons/react/24/solid";
import PersonalDetailsForm from "../components/PersonalDetailsForm";
import ProjectsForm from "../components/ProjectsForm";
import SkillsForm from "../components/SkillsForm";
import ExperienceForm from "../components/ExperienceForm";
import FilesForm from "../components/FilesForm";
import Spinner from "../components/ui/Spinner";
import ErrorFallback from "../components/ui/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import toast, { Toaster } from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const formComponents = {
  personaldetails: PersonalDetailsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  experiences: ExperienceForm,
  files: FilesForm,
};

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [activeCollection, setActiveCollection] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [activeDocument, setActiveDocument] = useState(null);
  const [isDocumentsLoading, setIsDocumentsLoading] = useState(true);
  const [isFormLoading, setIsFormLoading] = useState(true);

  useEffect(() => {
    getCollections();
  }, []);

  const getCollections = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/collections`, {
        withCredentials: true,
      });
      const dbCollections = response.data.collections;
      setCollections(dbCollections);

      const firstCollection = await dbCollections.find(
        (col) => col !== "users"
      );
      if (firstCollection) {
        setActiveCollection(firstCollection);
        await getDocumentsForCollection(firstCollection);
      }
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        console.error("Failed to load collections", error);
      }
      toast.error("Failed to load data. Please try again.");
    }
  };

  const getDocumentsForCollection = async (collectionName) => {
    setIsDocumentsLoading(true);
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/${collectionName}/documents`,
        {
          withCredentials: true,
        }
      );

      const documentsForCollection = response.data.documents;

      setDocuments(documentsForCollection);
      if (documentsForCollection.length > 0) {
        setActiveDocument(documentsForCollection[0]);
      } else {
        setActiveDocument(null);
      }

      setIsDocumentsLoading(false);
      setIsFormLoading(false);
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        console.error("Failed to load documents", error);
      }
      toast.error("Failed to load data. Please try again.");
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const stopPropagation = (e) => e.stopPropagation();

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

  const changeActiveCollection = async (name) => {
    setActiveCollection(name);
    await getDocumentsForCollection(name);
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

  const FormComponent = activeCollection
    ? formComponents[activeCollection]
    : null;

  return (
    <div>
      <Toaster />
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <SideBar
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          stopPropagation={stopPropagation}
          collections={collections}
          documents={documents}
          activeCollection={activeCollection}
          activeDocument={activeDocument}
          changeActiveDocument={changeActiveDocument}
          changeActiveCollection={changeActiveCollection}
          isDocumentsLoading={isDocumentsLoading}
        />
      </ErrorBoundary>
      <div className="md:ml-[320px] relative">
        {isDocumentsLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="p-4 md:hidden absolute right-0 z-2">
              <Bars3Icon
                className="w-8 h-8 text-neutral-400"
                onClick={toggleSidebar}
              />
            </div>
            <div>
              <ErrorBoundary FallbackComponent={ErrorFallback}>
                {FormComponent && (
                  <FormComponent
                    activeDocument={activeDocument}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    isFormLoading={isFormLoading}
                    setIsFormLoading={setIsFormLoading}
                  />
                )}
              </ErrorBoundary>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
