import { Container, Col, Row } from 'react-bootstrap';
import NotesList from '../features/NotesList';
import NoteDetailsForm from '../features/NoteDetailsForm';
import { useStore } from '../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function MainDashboard() {
    const { noteStore } = useStore();
    const { editMode } = noteStore;

    return (
        <Container fluid>
            <Row>
                <Col>
                    <NotesList />
                </Col>
                <Col>
                    {editMode &&
                        <NoteDetailsForm />}
                </Col>
            </Row>
        </Container>
    );
})