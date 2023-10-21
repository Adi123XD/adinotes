import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
 
const NoteItem = (props) => {
  const {note,editnote,showAlert}=props
  const context=useContext(noteContext);
    const {deletenote} =context;
    const handleDeletefunct=()=>{
      console.log("delete note button is clicked");
      console.log(note._id)
      deletenote(note._id);
      showAlert("Note has been deleted","warning")
    }
  return (
    <div className='col-md-4'>
      <div className="card my-3">
  <div className="card-body" >
    <div className="d-flex align-items-center justify-content-between">
    <h5 className="card-title">{note.title}</h5>
    <span className='d-flex' >
    <i className="fa-solid fa-trash mx-2" onClick={handleDeletefunct}></i>
    <i className="fa-solid fa-pen mx-2" onClick={()=>{editnote(note)}}></i>
    </span>
    </div>
    <p id="mynotedesc" className="card-text">{note.description} </p>
  </div>
</div>
    </div>
  )
}

export default NoteItem
