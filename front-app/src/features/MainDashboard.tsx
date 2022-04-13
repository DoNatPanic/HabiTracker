import React, { useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import NotesList from '../features/NotesList';
import LoadingComponent from '../app/layout/LoadingComponent';
import { useStore } from '../app/stores/store';
import { observer } from 'mobx-react';

export default observer(function MainDashboard() {
    const { noteStore } = useStore()
    const { loadNotes, noteRegistry, loadingInitial } = noteStore;

    useEffect(() => {
        if (noteRegistry.size === 0) loadNotes();
      }, [noteRegistry.size, loadNotes]);

    if (loadingInitial) return <LoadingComponent />
    return (
        <Container fluid>
            <Row>
                <Col>
                    <NotesList />
                </Col>
            </Row>
        </Container>
    );
})