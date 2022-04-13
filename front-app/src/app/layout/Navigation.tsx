import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { observer } from 'mobx-react';

export default observer (function Navigation() {

    return (
        <Navbar bg="dark" variant="dark" >
            <Container className="justify-content-start">
                <Nav.Item>
                    <Navbar.Brand href='/'>
                        <img
                            style={{marginRight: '10px'}}
                            width="30"
                            height="30"
                            src="/assets/images/logo.png" />
                        Habi2be
                    </Navbar.Brand>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href='/notes'>Notes</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Button variant="primary" href='/createNote'>Create Note</Button>
                </Nav.Item>
            </Container>
        </Navbar>
    );
})