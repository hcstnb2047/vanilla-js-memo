import NotesView from './NotesView.js';

export default class App {
    constructor(root) {
        this.notes =[];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());
    }

    _handlers(){
        return {
            onNoteSelect: (noteId) => {
                console.log('Note selected:', noteId);
            },
            onNoteAdd: () => {
                console.log('Note added:');
            },
            onNoteEdit: (title, body) => {
                console.log('Note edited:', title, body);
            },
            onNoteDelete: (id) => {
                console.log('Note deleted:', id);
            }
        }
    }
}