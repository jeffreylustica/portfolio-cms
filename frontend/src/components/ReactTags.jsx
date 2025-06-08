import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";

// const KeyCodes = {
//   comma: 188,
//   enter: [10, 13],
// };

// const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagInput = ({ id, tags = [], handleTagChange }) => {
  const handleDelete = (i) => {
    handleTagChange(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag) => {
    handleTagChange([...tags, { id: tag.text, text: tag.text }]);
  };

  const onClearAll = () => {
    handleTagChange([]);
  };

  const onTagUpdate = (index, newTag) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1, newTag);
    handleTagChange(updatedTags);
  };

  return (
    <ReactTags
      tags={tags} // Tags are expected to be objects { id, text }
      separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      onTagUpdate={onTagUpdate}
      editable
      clearAll
      onClearAll={onClearAll}
      maxTags={7}
      inputAttributes={{ id }}
      classNames={{ tagInputField: "bg-gray-100 max-w-sm mb-5 outline-0 p-2" }}
    />
  );
};

export default TagInput;
