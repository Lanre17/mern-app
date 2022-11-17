import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md"
import axios from "axios"

function CreateArea({addNote}) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function submitNote(event) {
    
    await axios
      .post("http://localhost:3001/api/notes", note)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

      addNote(note);
      setNote({
        title: "",
        content: ""
      });

      event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={submitNote}> <MdOutlineAdd/> </button>
      </form>
    </div>
  );
}

export default CreateArea;
