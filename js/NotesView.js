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

        // イベントリスナーの設定
        this.root.querySelector('.notesAdd').addEventListener('click', () => {
            this.onNoteAdd();
        });
    }

    // メモの一覧を表示するメソッド
    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector('.notesList');
        notesListContainer.innerHTML = '';

        notes.forEach(note => {
            const div = document.createElement('div');
            div.classList.add('notesList-item');
            div.innerHTML = `
                <div class="notesSmall-title">${note.title}</div>
                <div class="notesSmall-body">${note.body}</div>
                <div class="notesSmall-updated">${new Date(note.updated).toLocaleString()}</div>
            `;

            // クリックイベントを設定
            div.addEventListener('click', (e) => {
                const currentItem = e.target.closest('.notesList-item');
                if(currentItem) {   
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
}