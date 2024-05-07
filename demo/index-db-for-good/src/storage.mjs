import CacheDB from './cachedb.mjs';
import IndexedDB from './indexeddb.mjs';

export default class Storage {
    static #db;
    static #cache;

    static async init() {
        Storage.#db = await IndexedDB.init('the-posts-data-db', 1);
        Storage.#cache = await CacheDB.init('the-posts-image-db');

        return Storage;
    }

    static async load_posts() {
        const posts = await Storage.#db.load_posts();

        for await (const post of posts) {
            const { image_id } = post;

            if (image_id != null) {
                const image = await Storage.#cache.load_image(image_id);
                post.image = image;
            }
        }

        return posts;
    }

    static async save_post(post) {
        const image_id = post.image == null ? undefined : Date.now();
        const stored = await Storage.#db.save_post({
            title: post.title,
            description: post.description,
            image_id: image_id,
        });

        if (post.image != null) {
            await Storage.#cache.store_image(image_id, post.image);
        }

        return {
            ...post,
            id: stored.id,
            image_id,
        };
    }

    static async delete_post({ post_id, image_id }) {
        try {
            await Storage.#cache.delete_image(image_id);
            await Storage.#db.delete_post(post_id);

            return true;
        } catch (ex) {
            return false;
        }
    }
}
