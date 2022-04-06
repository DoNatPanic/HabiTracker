import { Note } from '../models/note';
import agent from '../api/agent'
import { makeAutoObservable, runInAction } from 'mobx';
const { v4: uuidv4 } = require('uuid');

export default class NoteStore {
    //notes: Note[] = [];
    noteRegistry = new Map<string, Note>();
    selectedNote: Note | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get activitiesByDate() {
        return Array.from(this.noteRegistry.values()).sort((a, b) =>
            Date.parse(b.date) - Date.parse(a.date));
    }

    loadNotes = async () => {
        this.setLoadingInitial(true);
        try {
            const notes = await agent.Notes.list();

            notes.forEach(note => {
                note.date = note.date.split('T')[0];
                //this.notes.push(note);
                this.noteRegistry.set(note.id, note);
            })
            this.setLoadingInitial(false);
        }
        catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectNote = (id: string) => {
        //this.selectedNote = this.notes.find(a => a.id === id);
        this.selectedNote = this.noteRegistry.get(id);
    }

    cancelSelectedNote = () => {
        this.selectedNote = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectNote(id) : this.cancelSelectedNote();
        this.editMode = true;
    }

    closeForm = () => {
        this.cancelSelectedNote();
        this.editMode = false;
    }

    createNote = async (note: Note) => {
        this.loading = true;
        note.userId = uuidv4();
        note.id = uuidv4();
        try {
            await agent.Notes.create(note);
            runInAction(() => {
                //this.notes.push(note);
                this.noteRegistry.set(note.id, note);
                this.selectedNote = note;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateNote = async (note: Note) => {
        this.loading = true;
        try {
            await agent.Notes.update(note);
            runInAction(() => {
                //this.notes = [...this.notes.filter(x => x.id !== note.id), note];
                this.noteRegistry.set(note.id, note);
                this.selectedNote = note;
                this.editMode = false;
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteNote = async (id: string) => {
        this.loading = true;
        try {
            await agent.Notes.delete(id);
            runInAction(() => {
                //this.notes = [...this.notes.filter(x => x.id !== id)];
                this.noteRegistry.delete(id);
                this.loading = false;
            })
        }
        catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}
