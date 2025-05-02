import NotesAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

// テスト用のメモを保存
NotesAPI.saveNote({
    title: 'テストメモ',
    body: 'これはテストメモです。'
});

const app = document.getElementById('app');
const view = new NotesView(app, {
    onNoteSelect(id) {
        console.log('Note selected:', id);
    },
    onNoteAdd() {
        console.log('Note added');
    },
    onNoteEdit(title, body) {
        console.log('Note edited:', title, body);
    },
    onNoteDelete(id) {
        console.log('Note deleted:', id);
    }
});

// サイドバーにメモ一覧を表示
view.updateNoteList(NotesAPI.getAllNotes());

// ローカルストレージの内容を確認
// console.log('Local Storage contents:', NotesAPI.getAllNotes());
