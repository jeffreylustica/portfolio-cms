import { useState, useEffect, useRef } from "react";

// controls edit mode and initial values only
const useEditMode = () => {
  const [editMode, setEditMode] = useState(false);
  const firstInputEl = useRef(null);

  useEffect(() => {
    if (editMode && firstInputEl.current) {
      firstInputEl.current.focus();
    }
  }, [editMode]);

  return { editMode, setEditMode, firstInputEl };
};

export default useEditMode;
