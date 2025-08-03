import {
  PencilSquareIcon,
  TrashIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

const FormActions = ({
  isNew,
  editMode,
  setEditMode,
  handleDelete,
  //   isSubmitting,
}) => {
  return (
    <div className="flex justify-center gap-10 mb-10 text-neutral-500 sticky top-0 py-4 bg-white">
      {!isNew && (
        <div
          className={`flex justify-center items-center flex-col p-2 w-16 h-16 rounded-md cursor-pointer hover:text-blue-700 ${
            editMode && "bg-neutral-100 text-blue-700"
          }`}
          onClick={() => setEditMode((prev) => !prev)}
        >
          <PencilSquareIcon className="w-12 h-12" />
          <span className="text-xs mt-2">Edit</span>
        </div>
      )}

      <button
        className={`flex justify-center items-center flex-col p-2 w-16 h-16 rounded-sm cursor-pointer ${
          editMode && "text-neutral-800 hover:text-blue-700"
        }`}
        type="submit"
        disabled={!editMode}
      >
        <CheckIcon className="w-12 h-12" />
        <span className="text-xs mt-2">Save</span>
      </button>

      {!isNew && (
        <div
          className="flex justify-center items-center flex-col p-2 w-16 h-16 rounded-sm cursor-pointer hover:text-red-500"
          onClick={handleDelete}
        >
          <TrashIcon className="w-12 h-12" />
          <span className="text-xs mt-2">Delete</span>
        </div>
      )}
    </div>
  );
};

export default FormActions;
