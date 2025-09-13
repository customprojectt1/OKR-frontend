// src/AutoGrowTextarea.js
import React, { useRef, useEffect } from 'react';
import './AutoGrowTextarea.css'; // We will create this next

const AutoGrowTextarea = ({ value, onChange, placeholder, required }) => {
  const textareaRef = useRef(null);

  // This effect runs every time the `value` of the textarea changes (i.e., on every keystroke)
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Temporarily reset the height to 'auto' to get the natural scroll height
      textarea.style.height = 'auto';
      // Set the new height based on the content's scroll height
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={1} // Start with a single row
      className="auto-grow-textarea"
    />
  );
};

export default AutoGrowTextarea;