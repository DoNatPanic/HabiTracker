import React, { useEffect, useState } from 'react';
import { Note } from '../../app/models/note';
import { useStore } from '../../app/stores/store';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
const { v4: uuidv4 } = require('uuid');

export default observer(function NoteDetailsForm() {
    const navigate = useHistory();
    //const navigate = useNavigate();
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

    /*function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setNote({ ...note, [name]: value });
    }*/

    function handleFormSubmit(note: Note) {
        if (note.id.length === 0) {
            let newNote = {
                ...note,
                userId: uuidv4(),
                id: uuidv4(),
            };
            createNote(newNote).then(() => navigate.push('/notes')).catch(err => console.error(err))
        } else {
            updateNote(note).then(() => navigate.push('/notes'))
        }
    }

    if (loadingInitial) return <LoadingComponent />;

    return (
        <div className='content-wrap'>
            <Formik enableReinitialize initialValues={note} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit}
                        autoComplete='off' style={{ width: '18rem', marginTop: '10px' }}>
                        <Field
                            className="fw-bold"
                            type='date'
                            placeholder='Date'
                            name='date' />
                        <Field
                            as="textarea"
                            rows={3}
                            placeholder='NoteMessage'
                            name='noteMessage' />
                        <button
                            name={note?.id}
                            className="button-main"
                            type="submit">
                            {loading ? 'Loading…' : 'Submit'}
                        </button>
                        <a href='/notes'>
                            <button className="button-variant"
                                type='button'>
                                Cancel
                            </button>
                        </a>
                    </Form>
                )}
            </Formik>
        </div>
    );
})