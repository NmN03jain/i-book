import React  from 'react';
import noteContext from '../context/notes/noteContext';
import { useContext , useState } from 'react';
const AddNotes = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context

    const [note, setNote] = useState({title:"", description:"",tag:""});

    const change=(e)=>{
        setNote({...note, [e.target.id] :e.target.value})
       
    }
    const click=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag)
        setNote({title:"", description:"",tag:""})  
        props.showAlert("Added successfully", "success")
    }



    return (


        <div>
            <h2 className="text-center" >Add Your Notes</h2>

            <div className="mb-3">
                <label htmlFor="title" className="form-label">Enter You Title</label>
                <input type="text" className="form-control" id="title" name="title" value={note.title}  onChange={change} />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Descriprion</label>
                <textarea className="form-control" id="description" name="description" value={note.description} onChange={change} rows="3"></textarea>
            </div>
            

            <div className="mb-3">
                <label htmlFor="description" className="form-label">Tag</label>
                <input className="form-control" id="tag" name="tag" value={note.tag} onChange={change} rows="3"></input>
            </div>

            <div className="but2">
            <button type="submit" className="btn btn-outline-secondary" onClick={click}>Submit </button>
            </div>
        </div>
    )
};

export default AddNotes;
