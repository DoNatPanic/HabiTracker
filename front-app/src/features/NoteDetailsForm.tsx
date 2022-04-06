import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStore } from '../app/stores/store';
import LoadingComponent from '../app/layout/LoadingComponent';
import { observer } from 'mobx-react-lite';

export default observer(function NoteDetailsForm() {
    const { noteStore } = useStore();
    const { selectedNote, closeForm, createNote, updateNote, loading } = noteStore;

    const initialState = selectedNote ?? {
        userId: '',
        id: '',
        date: '',
        noteMessage: ''
    }

    const [note, setNote] = useState(initialState)

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setNote({ ...note, [name]: value });
    }

    function handleSubmit() {
        note.id ? updateNote(note) : createNote(note);
    }

    if(!note) return <LoadingComponent />;

    return (
        <Form onSubmit={handleSubmit}
            autoComplete='off' style={{ width: '18rem', marginTop: '10px' }}>
            <Form.Group>
                <Form.Control
                    className="fw-bold"
                    type='date'
                    placeholder='Date'
                    value={note?.date}
                    name='date'
                    onChange={handleInputChange} />
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder='NoteMessage'
                    value={note?.noteMessage}
                    name='noteMessage'
                    onChange={handleInputChange} />
                <Button
                    name={note?.id}
                    variant="primary"
                    type="submit">
                    {loading ? 'Loading…' : 'Submit'}
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
})