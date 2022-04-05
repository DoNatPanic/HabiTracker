import { Container, Col, Row } from 'react-bootstrap';
import { Note } from '../models/note';
import NotesList from '../features/NotesList';
import NoteDetailsForm from '../features/NoteDetailsForm';

interface Props {
    notes: Note[];
    selectedNote: Note | undefined;
    openForm: (id: string) => void;
    editMode: boolean;
    closeForm: () => void;
    createOrEdit: (activity: Note) => void;
    deleteNote: (id: string) => void;
    submitting: boolean;
}

export default function MainDashboard({ notes, selectedNote,
    editMode, openForm, closeForm, createOrEdit, deleteNote, submitting }: Props) {
    return (
        <Container fluid>
            <Row>
                <Col>
                    <NotesList
                        notes={notes}
                        openForm={openForm} 
                        deleteNote={deleteNote}
                        submitting={submitting}
                    />
                </Col>
                <Col>
                    {editMode &&
                        <NoteDetailsForm
                            note={selectedNote}
                            closeForm={closeForm}
                            createOrEdit={createOrEdit}
                            submitting={submitting}
                        />}
                </Col>
            </Row>
        </Container>
    );
}