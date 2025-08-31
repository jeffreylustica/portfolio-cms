import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import api from "../utils/api";

const useFormDelete = ({ formData, onDelete, setIsFormLoading, endpoint }) => {
  const handleDelete = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: "Delete this item?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#2b7fff",
    });

    if (!result.isConfirmed) return;

    setIsFormLoading(true);
    try {
      const res = await api.delete(`/${endpoint}/${formData._id}`);

      onDelete(res.data.details._id);
      toast.success("Item deleted!");
    } catch (error) {
      if (import.meta.env.MODE === "development") {
        console.error("Error deleting:", error.message);
      }

      toast.error("Something went wrong!");
    } finally {
      setIsFormLoading(false);
    }
  };

  return handleDelete;
};

export default useFormDelete;
