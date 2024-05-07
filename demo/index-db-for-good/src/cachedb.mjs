export default class CacheDB {
    static #cache;

    static async init(cache_name) {
        CacheDB.#cache = await caches.open(cache_name);

        return CacheDB;
    }

    static async store_image(image_id, image) {
        await CacheDB.#cache.put(image_id, CacheDB.#to_storage_image(image));

        return image;
    }

    static async load_image(image_id) {
        const response = await CacheDB.#cache.match(image_id.toString());

        if (response?.ok !== true) {
            return new Blob([''], { type: 'image/png' });
        } else {
            return response.blob();
        }
    }

    static async delete_image(image_id) {
        return await CacheDB.#cache.delete(image_id.toString());
    }

    static #to_storage_image(image) {
        return new Response(image, {
            status: 200,
            statusText: 'success',
            headers: {
                'Content-Type': image.type,
                'Content-Size': image.size,
            },
        });
    }
}
