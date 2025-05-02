import App from './App.js';
import NotesAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

// テスト用のメモを保存
// NotesAPI.saveNote({
//     title: 'テストメモ',
//     body: 'これはテストメモです。'
// });

const root = document.getElementById('app');    
const app = new App(root);


// const view = new NotesView(root, {
//     onNoteSelect(id) {
//         console.log('Note selected:', id);
//     },
//     onNoteAdd() {
//         console.log('Note added');
//     },
//     onNoteEdit(title, body) {
//         console.log('Note edited:', title, body);
//     },
//     onNoteDelete(id) {
//         console.log('Note deleted:', id);
//     }
// });

// // サイドバーにメモ一覧を表示
// view.updateNoteList(NotesAPI.getAllNotes());

// // プレビュー欄にメモの内容を表示する
// view.updateActiveNote(NotesAPI.getAllNotes()[0]);
// // ローカルストレージの内容を確認
// // console.log('Local Storage contents:', NotesAPI.getAllNotes());
