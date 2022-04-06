import React, { useEffect } from 'react';
import LoadingComponent from './LoadingComponent';
import Navigation from './Navigation';
import { Container } from 'react-bootstrap';
import { useStore } from '../stores/store';
import MainDashboard from '../../features/MainDashboard';
import { observer } from 'mobx-react-lite';

function App() {
  const { noteStore } = useStore();

  useEffect(() => {
    noteStore.loadNotes();
  }, [noteStore]);

  if (noteStore.loadingInitial) return <LoadingComponent />

  return (
    <>
      <Navigation />
      <Container style={{ marginTop: '2em' }} >
        <MainDashboard />
      </Container>
    </>
  );
}

export default observer(App);
