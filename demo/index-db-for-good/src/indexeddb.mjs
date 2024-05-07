export default class IndexedDB {
    static READONLY = 'readonly';
    static READWRITE = 'readwrite';

    static #db;

    static async init(name, version) {
        await new Promise((res, rej) => {
            const db = indexedDB.open(name, version);
            db.addEventListener('success', (e) => {
                IndexedDB.#db = e.target.result;

                res(e);
            });
            db.addEventListener('upgradeneeded', (e) => {
                IndexedDB.#db = e.target.result;
                IndexedDB.#db.createObjectStore('posts', {
                    keyPath: 'id',
                    autoIncrement: true,
                });

                res(e);
            });
            db.addEventListener('error', (e) => rej(e));
        });

        return IndexedDB;
    }

    static async load_posts() {
        return new Promise((res, rej) => {
            const transaction = IndexedDB.#db.transaction(
                ['posts'],
                IndexedDB.READONLY,
            );
            transaction.onerror = rej;

            const os = transaction.objectStore('posts');
            os.onerror = rej;

            const request = os.getAll();
            request.onerror = rej;

            request.onsuccess = (e) => res(e.target.result);
        });
    }

    static async save_post(post) {
        return new Promise((res, rej) => {
            const transaction = IndexedDB.#db.transaction(
                ['posts'],
                IndexedDB.READWRITE,
            );
            transaction.onerror = rej;

            const os = transaction.objectStore('posts');
            os.onerror = rej;

            const request = os.add(post);
            request.onsuccess = (e) => {
                const id = e.target.result;

                res({ ...post, id });
            };
            request.onerror = rej;
        });
    }

    static async delete_post(post_id) {
        return new Promise((res, rej) => {
            const transaction = IndexedDB.#db.transaction(
                ['posts'],
                IndexedDB.READWRITE,
            );
            transaction.onerror = rej;

            const os = transaction.objectStore('posts');
            os.onerror = rej;

            const request = os.delete(post_id);
            request.onsuccess = (e) => {
                res(true);
            };
            request.onerror = rej;
        });
    }
}
