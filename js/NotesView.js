export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `<div class="notesSidebar">
            <button class="notesAdd" type="button">ノートを追加</button>
            <div class="notesList">
                <div class="notesList-item">
                    <div class="notesSmall-title">タイトル</div>
                    <div class="notesSmall-body">内容</div>
                    <div class="notesSmall-updated">12/23</div>
                </div>
            </div>
        </div>
        <!-- ノートプレビュー -->
        <div class="notesPreview">
            <input type="text" class="notesTitle" placeholder="タイトルを記入">
            <textarea class="notesBody" placeholder="ここに本文を追加"></textarea>
        </div>`;

        const titleField = this.root.querySelector('.notesTitle');
        const bodyField = this.root.querySelector('.notesBody');

        // イベントリスナーの設定
        this.root.querySelector('.notesAdd').addEventListener('click', () => {
            this.onNoteAdd();
        });

        // タイトルと本文の編集イベント
        titleField.addEventListener('input', () => {
            const updatedTitle = titleField.value;
            const updatedBody = bodyField.value;
            this.onNoteEdit(updatedTitle, updatedBody);
        });

        bodyField.addEventListener('input', () => {
            const updatedTitle = titleField.value;
            const updatedBody = bodyField.value;
            this.onNoteEdit(updatedTitle, updatedBody);
        });
    }

    // メモの一覧を表示するメソッド
    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector('.notesList');
        notesListContainer.innerHTML = '';

        notes.forEach(note => {
            const div = document.createElement('div');
            div.classList.add('notesList-item');
            div.dataset.noteId = note.id;
            div.innerHTML = `
                <div class="notesSmall-title">${note.title}</div>
                <div class="notesSmall-body">${note.body}</div>
                <div class="notesSmall-updated">${new Date(note.updated).toLocaleString()}</div>
            `;

            // クリックイベントを設定
            div.addEventListener('click', (e) => {
                const currentItem = e.target.closest('.notesList-item');
                if (currentItem) {
                    this.onNoteSelect(currentItem.dataset.noteId);
                }
            });

            // ダブルクリックイベントを設定
            div.addEventListener('dblclick', () => {
                const doDelete = confirm('本当に削除しますか？');
                if (doDelete) {
                    this.onNoteDelete(note.id);
                }
            });

            notesListContainer.appendChild(div);
        });
    }

    updateActiveNote(note) {
        if (!note) {
            // メモが選択されていない場合は入力欄をクリア
            this.root.querySelector('.notesTitle').value = '';
            this.root.querySelector('.notesBody').value = '';
            return;
        }

        // プレビュー内にメモの内容を表示する
        this.root.querySelector('.notesTitle').value = note.title;
        this.root.querySelector('.notesBody').value = note.body;

        // 既存の選択状態をクリア
        this.root.querySelectorAll('.notesList-item').forEach(noteListItem => {
            noteListItem.classList.remove('notesList-item--selected');
        });

        // 選択されたメモをハイライト
        this.root.querySelector(`.notesList-item[data-note-id="${note.id}"]`).classList.add('notesList-item--selected');
    }


}