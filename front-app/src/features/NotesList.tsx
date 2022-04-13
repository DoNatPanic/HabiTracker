import React, { SyntheticEvent, useState } from 'react';
import { Button, ListGroup, ListGroupItem, Container, Row, Col } from 'react-bootstrap';
import { useStore } from '../app/stores/store';
import { observer } from 'mobx-react';

export default observer(function NotesList() {
    const { noteStore } = useStore();
    const { notesByDate, deleteNote, loading } = noteStore;

    const [target, setTarget] = useState('');

    function handleDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteNote(id);
    }

    return (
        <ListGroup as="ul">
            {notesByDate.map(note => (
                <ListGroupItem as="li" className="d-flex" key={note.id}>
                    <Container>
                        <div className="fw-bold">{note.date}</div>
                        <div>{note.noteMessage}</div>
                        <Row>
                            <Col>
                                <Button href={'/notes/' + note.id}>View</Button>
                            </Col>
                            <Col>
                                <Button
                                    name={note.id}
                                    variant="danger"
                                    onClick={(e) => handleDelete(e, note.id)}>
                                    {loading && target === note.id ? 'Loading…' : 'Delete'}
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </ListGroupItem >
            ))}
        </ListGroup>
    )
})