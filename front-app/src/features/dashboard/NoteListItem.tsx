import React, { SyntheticEvent, useState } from 'react';
import { Note } from '../../app/models/note';
import { useStore } from '../../app/stores/store';

interface Props {
    note: Note
}

export default function NoteListItem({note}: Props) {
    const { noteStore } = useStore();
    const { deleteNote, loading } = noteStore;

    const [target, setTarget] = useState('');

    function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteNote(id);
    }

    return (
        <div className='my-list' key={note.id}>
            <div>
                <div>{note.date}</div>
                <div>{note.noteMessage}</div>
                <div className='row'>
                    <div className="column left">
                    <a href={'/notes/' + note.id}>
                        <button className="button-main">View</button>
                    </a>
                    </div>
                    <div className="column left">
                        <button
                            name={note.id}
                            className="button-variant"
                            onClick={(e) => handleDelete(e, note.id)}>
                            {loading && target === note.id ? 'Loading…' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}