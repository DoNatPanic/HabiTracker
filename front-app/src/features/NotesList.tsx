import React, { Fragment, SyntheticEvent, useState } from 'react';
import { Note } from '../models/note';
import { Button, ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';


interface Props {
    notes: Note[];
    openForm: (id: string) => void;
    deleteNote: (id: string) => void;
    submitting: boolean;
}

export default function NotesList({ notes, openForm, deleteNote, submitting }: Props) {

    const [target, setTarget] = useState('');

    function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteNote(id);
    }

    return (
        <ListGroup as="ul">
            {notes.map(note => (
                <ListGroupItem as="li" className="d-flex" key={note.id}>
                    <Container>
                        <div className="fw-bold">{note.date}</div>
                        <div>{note.noteMessage}</div>
                        <Row>
                            <Col>
                                <Button onClick={() => openForm(note.id)}>View</Button>
                            </Col>
                            <Col>
                                <Button
                                    name={note.id}
                                    variant="danger"
                                    onClick={(e) => handleDelete(e, note.id)}>
                                    {submitting && target === note.id ? 'Loading…' : 'Delete'}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </ListGroupItem >
            ))}
        </ListGroup>
    )
}