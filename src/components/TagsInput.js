import { useState, useEffect, useRef } from "react";

function TagsInput({
  options = ["Dolina Białej Wody", "Dolina Kieżmarska", "Dolina Mięguszowiecka", "Dolina Małej Zimnej Wody", "Dolina Staroleśna"],
}) {
  const [tags, setTags] = useState([]);
  const [value, setValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestions = options.filter((option) => option.toLowerCase().includes(value.toLowerCase()));

  const autocompleteRef = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSuggestionClick = (suggetion) => {
    setValue(suggetion);
    setShowSuggestions(false);
  };

  function handleKeyDown(e) {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";
  }

  function removeTag(index) {
    setTags(tags.filter((el, i) => i !== index));
  }

  return (
    <div className="tags-input-container" ref={autocompleteRef}>
      {tags.map((tag, index) => (
        <div className="tag-item" key={index}>
          <span className="text">{tag}</span>
          <span className="delete" onClick={() => removeTag(index)}>
            &times;
          </span>
        </div>
      ))}
      <div className="autocomplete">
        <input
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Add a tag"
          className="tags-input"
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && (
          <ul className="suggestions">
            {suggestions.map((suggestion) => (
              <li onClick={() => handleSuggestionClick(suggestion)} key={suggestion}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TagsInput;
