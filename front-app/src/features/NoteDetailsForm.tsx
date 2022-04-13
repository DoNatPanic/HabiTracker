import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useStore } from '../app/stores/store';
import LoadingComponent from '../app/layout/LoadingComponent';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
const { v4: uuidv4 } = require('uuid');

export default observer(function NoteDetailsForm() {
    let navigate = useHistory();
    const { noteStore } = useStore();
    const { createNote, updateNote, loading, loadNote, loadingInitial } = noteStore;
    const { id } = useParams<{ id: string }>();

    const [note, setNote] = useState({
        userId: '',
        id: '',
        date: '',
        noteMessage: ''
    })

    useEffect(() => {
        let isMounted = true;
        if (id) loadNote(id).then(note => {
            if (isMounted) setNote(note!)
        });
        return () => { isMounted = false };
    }, [id, loadNote]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setNote({ ...note, [name]: value });
    }

    function handleSubmit() {
        if (note.id.length === 0) {
            let newNote = {
                ...note,
                userId: uuidv4(),
                id: uuidv4(),
            };
            createNote(newNote);
        } else {
            updateNote(note);
        }
        navigate.push('/notes');
    }

    if (loadingInitial) return <LoadingComponent />;

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
                    href='/notes'>
                    Cancel
                </Button>
            </Form.Group>
        </Form>
    );
})