import React, { useEffect } from 'react';
import NotesList from './NotesList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react';
import NoteFilters from './NoteFilters';

export default observer(function MainDashboard() {
    const { noteStore } = useStore()
    const { loadNotes, noteRegistry, loadingInitial } = noteStore;

    useEffect(() => {
        if (noteRegistry.size <= 1) loadNotes();
    }, [noteRegistry.size, loadNotes]);

    if (loadingInitial) return <LoadingComponent />
    return (
        <div className='content-wrap' >
            <div className="row">
                <div className="column left"><NotesList /></div>
                <div className="column right"><NoteFilters /></div>
            </div>
        </div>
    );
})