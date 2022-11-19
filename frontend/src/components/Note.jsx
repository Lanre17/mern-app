import axios from "axios";
import React, { useState } from "react";
import {MdDeleteForever} from "react-icons/md"
import {MdModeEditOutline} from "react-icons/md"
import {MdSystemSecurityUpdateGood} from "react-icons/md"

function Note({ id, title, content, onDelete}) {
  const [editing, setEditStatus] = useState(false);
  const [t, setTitle] = useState(title);
  const [c, setContent] = useState(content);
  
  
  async function handleClick() {
    await axios.delete(`https://mernapplanre.herokuapp.com/${id}`);
    onDelete(id);
  }

  function editNote() {
    setEditStatus((oldStatus) =>{
      return !oldStatus;
    });
  }

  async function updateNote() {
    axios
      .put(`https://mernapplanre.herokuapp.com/${id}`, { title: t, content: c})
      .then((res) => { 
        console.log(res);
        editNote()
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitle(value);
    } else if (name === 'content') {
      setContent(() =>{
        return value;
      });
      console.log(c, t)
    }
  }

  return (
    <React.Fragment>
      <React.Fragment>
      { editing && 
        <div>
          <form>
            <input
              name="title"
              value={t}
              onChange={handleChange}
              placeholder="Title"
            />
            <textarea
              name="content"
              value={c}
              onChange={handleChange}
              placeholder="Take a note..."
              rows="3"
            />
            <button type="button" onClick={updateNote}> <MdSystemSecurityUpdateGood /></button>
          </form>
        </div>}
      </React.Fragment>
      <React.Fragment>
      { !editing &&
        <div className="note">
          <h1>{t}</h1>
          <p>{c}</p>
          <button onClick={handleClick}> <MdDeleteForever/> </button>
          <button onClick={editNote}> <MdModeEditOutline/> </button>
        </div>}
      </React.Fragment>
    </React.Fragment>
  );
}

export default Note;
