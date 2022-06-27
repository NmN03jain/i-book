import React, { useRef } from 'react'
import { useContext, useEffect,useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNotes from './AddNotes';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    // const {showAlert} = props 
    let navigate=useNavigate();

    const context = useContext(noteContext);
    const { notes, getNote,updateNote } = context;
    const [note, setNote] = useState({id:"",etitle:"", edescription:"",etag:""});

    useEffect(() => {
        if(localStorage.getItem("token")){
            getNote();
        }
        else{
            navigate("/login")
        }
        // eslint-disable-next-line
    }, []);

    const change=(e)=>{
        e.preventDefault();
        setNote({...note, [e.target.id] :e.target.value})
    }
    const ref= useRef(null)
    const refclose = useRef(null)

    const updateNotes=(current)=>{
        ref.current.click()
        setNote({id:current._id, etitle:current.title, edescription:current.description, etag:current.tag})
       
    }
    const click=()=>{
        updateNote(note.id,note.etitle,note.edescription,note.etag);
        refclose.current.click();
        props.showAlert("Updated successufully" ,"success")

    }

    return (        
        <>
            <AddNotes showAlert={props.showAlert} />

            <button type="button"  ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="etitle" className="form-label">Enter You Title</label>
                            <input type="text" className="form-control col-xs-1" id="etitle" name="etitle" value={note.etitle} onChange={change} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="edescription" className="form-label">Descriprion</label>
                            <textarea className="form-control" id="edescription" name="edescription"  value ={note.edescription} onChange={change} rows="3"></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="etag" className="form-label">Tag</label>
                            <input className="form-control" id="etag" name="etag" value={note.etag} onChange={change} rows="3"></input>
                        </div>
                        </div>


                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button  onClick={click} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                {notes.map((note) => {
                    return <Noteitem key={note._id} showAlert={props.showAlert} updateNotes={updateNotes} note={note} />

                })}

            </div>
        </>
    )
}

export default Notes
