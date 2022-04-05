import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Note } from '../models/note';

interface Props {
    note: Note | undefined;
    closeForm: () => void;
    createOrEdit: (note: Note) => void;
    submitting: boolean;
}

export default function NoteDetailsForm({ note: selectedNote, closeForm,
    createOrEdit, submitting }: Props) {

    const initialState = selectedNote ?? {
        userId: '',
        id: '',
        date: '',
        noteMessage: ''
    }

    const [note, setNote] = useState(initialState);

    function handleSubmit() {
        createOrEdit(note);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setNote({ ...note, [name]: value });
    }

    return (
        <Form onSubmit={handleSubmit}
            autoComplete='off' style={{ width: '18rem', marginTop: '10px' }}>
            <Form.Group>
                <Form.Control
                    className="fw-bold"
                    type='date'
                    placeholder='Date'
                    value={note.date}
                    name='date'
                    onChange={handleInputChange} />
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder='NoteMessage'
                    value={note.noteMessage}
                    name='noteMessage'
                    onChange={handleInputChange} />
                <Button
                    name={note.id}
                    variant="primary"
                    type="submit">
                    {submitting ? 'Loading…' : 'Submit'}
                </Button>
                <Button
                    variant="secondary"
                    type='button'
                    onClick={closeForm}>
                    Cancel
                </Button>
            </Form.Group>
        </Form>
    );
}