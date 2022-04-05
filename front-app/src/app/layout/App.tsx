import React, { Fragment, useEffect, useState } from 'react';
import { Note } from '../../models/note';
import LoadingComponent from './LoadingComponent';
import Navigation from './Navigation';
import agent from '../api/agent'
import { Container } from 'react-bootstrap';
import MainDashboard from '../../features/MainDashboard';
const { v4: uuidv4 } = require('uuid');

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Notes.list().then(response => {
      let notes: Note[] = [];
      response.forEach(note => {
        note.date = note.date.split('T')[0];
        notes.push(note);
      })
      setNotes(response);
      setLoading(false)
    })
  }, []);

  function handleFormOpen(id?: string) {
    id ? handleSelectNote(id) : handleCancelSelectNote();
    setEditMode(true);
  }

  function handleFormClose() {
    handleCancelSelectNote();
    setEditMode(false);
  }

  function handleCancelSelectNote() {
    setSelectedNote(undefined);
  }

  function handleSelectNote(id: string) {
    setSelectedNote(notes.find(x => x.id === id))
  }

  function handleCreateOrEditNote(note: Note) {
    setSubmitting(true);
    if (note.id) {
      agent.Notes.update(note).then(() => {
        setNotes([...notes.filter(x => x.id !== note.id), note]);
        setSelectedNote(note);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      note.userId = uuidv4();
      note.id = uuidv4();
      agent.Notes.create(note).then(() => {
        setNotes([...notes, note]);
        setSelectedNote(note);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteNote(id: string) {
    setSubmitting(true);
    agent.Notes.delete(id).then(() => {
      setNotes([...notes.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent />

  return (
    <>
      <Navigation openForm={handleFormOpen} />
      <Container style={{ marginTop: '2em' }} >
        <MainDashboard
          notes={notes}
          selectedNote={selectedNote}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditNote}
          deleteNote={handleDeleteNote}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
