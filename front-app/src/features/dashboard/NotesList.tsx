import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react';
import NoteListItem from './NoteListItem';

export default observer(function NotesList() {
    const { noteStore } = useStore();
    const { notesByDate } = noteStore;


    return (
        <ul className='list-group'>
            {notesByDate.map(note => (
                <NoteListItem key={note.id} note={note} />
            ))}
        </ul>
    )
})