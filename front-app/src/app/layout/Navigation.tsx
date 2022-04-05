import { Navbar, Nav, Container, Button } from 'react-bootstrap';

interface Props {
    openForm: () => void;
}

export default function Navigation({openForm}: Props) {
    return (
        <Navbar bg="dark" variant="dark" >
            <Container className="justify-content-start">
                <Nav.Item>
                    <Navbar.Brand >
                        <img
                            style={{marginRight: '10px'}}
                            width="30"
                            height="30"
                            src="/assets/images/logo.png" />{' '}
                        Habi2be
                    </Navbar.Brand>
                </Nav.Item>
                <Nav.Item>
                    <Navbar.Text>Control you life</Navbar.Text>
                </Nav.Item>
                <Nav.Item>
                    <Button variant="primary" onClick={openForm}>Create Note</Button>
                </Nav.Item>
            </Container>
        </Navbar>
    );
}