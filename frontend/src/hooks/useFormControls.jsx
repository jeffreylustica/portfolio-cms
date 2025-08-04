import { useState, useEffect, useRef } from "react";

// controls edit mode and initial values only
const useFormControls = ({
  activeDocument,
  emptyFormTemplate,
  setFormData,
}) => {
  const [isNew, setIsNew] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const firstInputEl = useRef(null);

  useEffect(() => {
    if (!activeDocument) return;

    if (activeDocument._id === "new") {
      setIsNew(true);
      setFormData(emptyFormTemplate);
      setEditMode(true);
      setTimeout(() => firstInputEl.current?.focus(), 0);
    } else {
      setIsNew(false);
      // setFormData({ ...emptyFormTemplate, ...activeDocument });
      setFormData({ ...activeDocument });
      setEditMode(false);
    }
  }, [activeDocument]);

  useEffect(() => {
    if (editMode && firstInputEl.current) {
      firstInputEl.current.focus();
    }
  }, [editMode]);

  return { isNew, editMode, setEditMode, firstInputEl };
};

export default useFormControls;
