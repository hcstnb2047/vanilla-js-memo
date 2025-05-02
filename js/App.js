import NotesView from './NotesView.js';
import NotesAPI from './NotesAPI.js';
export default class App {
    constructor(root) {
        this.notes =[];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        // 最初に必ず呼ばれる
        this._refreshNotes();
    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();
        this._setNotes(notes);

        // 初回表示時のみ最初のメモを選択
        if (notes.length > 0 && !this.activeNote) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes = notes;
        this.view.updateNoteList(notes);
        const activeNote = this.activeNote ? notes.find(note => note.id === this.activeNote.id) : null;
        this.view.updateActiveNote(activeNote);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note);
    }

    _handlers(){
        return {
            onNoteSelect: (noteId) => {
                const selectedNote = this.notes.find(note => note.id === Number(noteId));
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                console.log('Note added:');
            },
            onNoteEdit: (title, body) => {
                console.log('Note edited:', title, body);
                NotesAPI.saveNote( {
                   id: this.activeNote.id,
                   title : title,
                   body : body,
                });
                this._refreshNotes();
            },
            onNoteDelete: (id) => {
                console.log('Note deleted:', id);
            }
        }
    }
}