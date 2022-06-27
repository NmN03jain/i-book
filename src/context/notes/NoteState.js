import React from 'react';
import noteContext from './noteContext';
import { useState } from 'react';


const NoteState = (props) => {

    const host = "http://localhost:80"
    const Notes = []
    const [notes, setNotes] = useState(Notes)

    // fucntion for getting notes
    const getNote = async () => {


        // API cal
        const api = await fetch(`${host}/notes/fetchNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authen': localStorage.getItem("token")
            }
        });
        const json = await api.json()
        console.log(json)
        setNotes(json)
    }


    // Funiton for Adding notes on client side
    const addNote = async (title, description, tag) => {

        // API cal
        const api = await fetch(`${host}/notes/addingNotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authen':localStorage.getItem("token")

            },
            body: JSON.stringify({ title, description, tag })
        })
        const note = await api.json();
        setNotes(notes.concat(note))
    }

    // Fucntion for deleting notes from client side
    const deleteNote = async (id) => {


        // API call
        const api = await fetch(`${host}/notes/DeleteNotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authen': (localStorage.getItem("token"))
            },  
        })
        const json = await api.json();
        console.log(json)


        console.log("Deleting note by id ", id)
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    // Fucntion for updating notes from client side
    const updateNote = async (id, title, description, tag) => {

        // API call
        const api = await fetch(`${host}/notes/Update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authen': localStorage.getItem("token")
            },
            body: JSON.stringify({ title, description, tag })
        })
        const json = await api.json();
        console.log(json)

        
        const Noti = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < Noti.length; index++) {
            const element = Noti[index];

            if (element._id === id) {
                Noti[index].title = title;
                Noti[index].description = description;
                Noti[index].tag = tag;
            }
        }
        setNotes(Noti)
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, updateNote, getNote }}>
            {props.children}

        </noteContext.Provider>
    )

};

export default NoteState;