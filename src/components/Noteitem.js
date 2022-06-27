import React from 'react'
import noteContext from '../context/notes/noteContext';
import { useContext } from 'react';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote } = context
    const { note , updateNotes } = props;
    const deletee=()=>{
        deleteNote(note._id)
        props.showAlert("Deleted successfully" , "success")
    }

    return (
        <>
            <div className="col-md-3">
                <div className="card text-white bg-dark my-3 "  >
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description} </p>
                        <p className="card-text">{note.tag} </p>
                        <i className="far fa-trash-alt mx-3" onClick={deletee}></i>
                        <i className="fas fa-pen mx-3" onClick={()=>{updateNotes(note)}} ></i>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Noteitem
