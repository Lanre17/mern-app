import axios from "axios";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";


function App() {

  const [notes, setNotes] = useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3001/api/notes")
      .then((res) => {
        console.log(res);
        setNotes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);


  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes(prevNote => {
      return prevNote.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }



  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index, id) => {
        return (
          <Note
            key={index}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={() => deleteNote(index)}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
