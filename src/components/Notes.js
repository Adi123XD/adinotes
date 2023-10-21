import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import Addnote from './Addnote';
import {  useNavigate } from 'react-router-dom';
const Notes = (props) => {
  const navigate=useNavigate();
  const context = useContext(noteContext)
  const { notes, getnotes,updatenote } = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
    getnotes();
    }
  else
  {
    navigate('/login');
  }
    // eslint-disable-next-line
  }, [])
  const editnote = (note) => {
    editref.current.click();
    setNote(note);
  }
  const editref = useRef(null);
  const [note,setNote]=useState({title:"",description:"",tag:"default"});


  const handleSaveChanges=(e)=>{
    e.preventDefault();
    updatenote(note._id,note.title,note.description,note.tag)
    props.showAlert("Note updated","success");
   

  }

  const onchange=(e)=>{
    
    setNote({...note,[e.target.name]:e.target.value})

  }

  return (
    <div className="row mt-3">
      <Addnote showAlert={props.showAlert}/>

     
      
<button   ref={editref} type="button" className="btn btn-primary hideit" data-bs-toggle="modal" data-bs-target="#editnoteModal">
  Launch demo modal
</button>


<div className="modal fade" id="editnoteModal" tabIndex="-1" aria-labelledby="editnoteModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="editnoteModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form >
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title'  value={note.title} aria-describedby="emailHelp"  onChange={onchange}required/>
        <div id="emailHelp" className="form-text"></div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">description</label>
        <input type="text" className="form-control" id="description" name='description'minLength={5} value={note.description} onChange={onchange} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">tag</label>
        <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange} />
      </div>
    
    </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.title.length<=3 || note.description.length<=5}type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveChanges}>Update Note</button>
      </div>
    </div>
  </div>
</div>
      <h2>Your Notes </h2>
      <div className="container mx-2">
        {notes.length===0 && 'No notes to display'}
      </div>

      {notes.map((note) => {
        return (
          <NoteItem key={note._id} note={note} editnote={editnote} showAlert={props.showAlert} />
        )
      })}
    </div>
  )
}

export default Notes
