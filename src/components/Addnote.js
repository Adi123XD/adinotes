import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';
const Addnote = (props) => {
    const context = useContext(noteContext)
  const { addnote } = context;
  const [note , setNote] = useState({title:"",description :"",tag:"default"})
  const handleAddnote=(e)=>{
    e.preventDefault();
    addnote(note.title ,note.description,note.tag);
    console.log("localStorage=",localStorage.getItem('token'))
    setNote({title:"",description :"",tag:""})
    props.showAlert("Note added","success");

  }

  const onchange=(e)=>{
    
    setNote({...note,[e.target.name]:e.target.value})

  }
  
  return (
    <>
    <h2>Add your note</h2>
    <form className='mt-3 mb-2'>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name='title'placeholder='your title here' aria-describedby="emailHelp"  onChange={onchange}value={note.title} required/>
        <div id="emailHelp" className="form-text"></div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">description</label>
        <input type="text" className="form-control" id="description" name='description' placeholder='Your description here' onChange={onchange}value={note.description} required/>
      </div>
      <div className="mb-3">
        <label htmlFor="tag" className="form-label">tag</label>
        <input type="text" className="form-control" id="tag" name='tag' placeholder='Your tag here' onChange={onchange}value={note.tag} />
      </div>
      <button disabled={note.title.length<=3 || note.description.length<=5} type="submit" className="btn btn-primary" onClick={handleAddnote}>Add note</button>
    </form>
    </>
  )
}

export default Addnote
