import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";

const TagInput = ({ id, tags = [], handleTagChange, disabled }) => {
  const handleDelete = (i) => {
    if (!disabled) handleTagChange(tags.filter((_, index) => index !== i));
  };

  const handleAddition = (tag) => {
    if (!disabled) handleTagChange([...tags, { id: tag.text, text: tag.text }]);
  };

  const onClearAll = () => {
    if (!disabled) handleTagChange([]);
  };

  return (
    <ReactTags
      tags={tags} // Tags are expected to be objects { id, text }
      separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      clearAll
      onClearAll={onClearAll}
      maxTags={7}
      inputAttributes={{ id, readOnly: disabled }}
      inputProps={{
        disabled: disabled,
      }}
      classNames={{
        tags: "mt-2",
        tagInput: "mt-2",
        tagInputField:
          "max-w-sm w-full border border-neutral-200 rounded-sm p-2 py-3 focus:shadow-lg focus:shadow-blue focus:outline-1 focus:outline-blue-300",
        tag: "bg-blue-200 px-2 py-1 mb-5 mr-2 rounded-lg",
        remove: `p-1 ml-1 text-white hover:text-red-600 cursor-pointer [&>svg]:fill-current ${
          disabled ? "hidden" : ""
        }`,
        clearAll: `p-2 cursor-pointer hover:text-red-600 ${
          disabled ? "hidden" : ""
        }`,
      }}
    />
  );
};

export default TagInput;
