import Navigation from './Navigation';
import HomePage from '../../features/home/HomePage';
import { Container } from 'react-bootstrap';
import MainDashboard from '../../features/MainDashboard';
import { observer } from 'mobx-react';
import { Route, useLocation } from 'react-router-dom';
import NoteDetailsForm from '../../features/NoteDetailsForm';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navigation />
            <Container style={{ marginTop: '2em' }} >
              <Route exact path='/' component={HomePage} />
              <Route exact path='/notes' component={MainDashboard} />
              <Route key={location.key} path={['/createNote', '/notes/:id']} component={NoteDetailsForm} />
            </Container>
          </>
        )} />
    </>
  );
}

export default observer(App);
