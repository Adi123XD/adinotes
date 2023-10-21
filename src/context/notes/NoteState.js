import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    // get all notes
    const host ="http://localhost:5000"
    const [notes, setNotes]=useState([])
    const getnotes=async ()=>{
      const response =await fetch(`${host}/api/notes/fetchallnotes`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "auth-token":localStorage.getItem('token')
        }
      })
      const json =await response.json();
      console.log(json);
      setNotes(json);
    }
    
      // Add a note
       const addnote=async (title,description,tag)=>{
        //Api call to update in server
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
       const parsedres = await response.json();
      
        // To Do api call
        // console.log("Addnng the note")
        let note={
          "_id": parsedres._id,
          "user": parsedres.user,
          "title": title,
          "description": description,
          "tag": tag,
          "date": parsedres.date,
          "__v": parsedres.__v
        }
        
        setNotes(notes=>[note,...notes])

       }



      // Delete  a note
      const deletenote= async(noteid)=>{
        // api call to delete a note
        const response = await fetch(`${host}/api/notes/deletenote/${noteid}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
        });
        const json =await response.json();
        console.log(json);
        const newNotes= notes.filter((note)=>{return note._id!==noteid});
        setNotes(newNotes);
        

      }


      // update a note
      const updatenote=async (noteid, title, description, tag)=>{
        //Api call to update in server
        const response = await fetch(`${host}/api/notes/updatenote/${noteid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
        });
       const json = await response.json();
       console.log(json);
      
        // function logic client side
    
        setNotes((notes) => {
          const updatedNotes = notes.map((note) => {
            if (note._id === noteid) {
              return {
                ...note,
                title: title,
                description: description,
                tag: tag,
              };
            } else {
              return note;
            }
          });
          return updatedNotes;
        });
        // for (let i = 0; i < notes.length; i++) {
        //   const element = notes[i];
        //   if(element._id=== noteid)
        //   {
        //     element.title=title;
        //     element.description=description;
        //     element.tag=tag;
            
        //   }
          
        // }
        

      }
    return (
        <NoteContext.Provider value={{notes,addnote,deletenote,updatenote,getnotes}}>
        {props.children}
        </NoteContext.Provider>
        
    )
}
export default NoteState;
