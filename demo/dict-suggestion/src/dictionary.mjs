const build_node = (token) => ({
    token,
    links: new Map(/* token ; node */),
});

export default class Dictionary {
    #root = build_node('');

    consume_raw_input(input) {
        const filtered = input
            .trim()
            .toLowerCase()
            .match(/(\p{L}|\d)*/gu);

        filtered.forEach((word) => this.#add_word(word));
    }

    consume_word(word) {
        this.#add_word(word);
        console.log(this.#root);
    }

    lookup_suggestions(input) {
        const start_node = this.#lookup_start_node(input);
        const suggestions = this.#generate_suggestions(start_node);

        return suggestions;
    }

    #add_word(word) {
        if (word.trim() === '') {
            return;
        }

        let current_node = this.#root;

        for (let i = 0; i < word.length; i++) {
            const c = word[i];

            if (current_node.token === c) {
                continue;
            } else if (current_node.links.has(c)) {
                current_node = current_node.links.get(c);
            } else {
                const new_node = build_node(c);

                current_node.links.set(c, new_node);
                current_node = new_node;
            }
        }
    }

    #lookup_start_node(input) {
        const lookup = input.trim().toLowerCase();

        let current_node = this.#root;

        for (let i = 0; i < lookup.length; i++) {
            const c = lookup[i];
            const next_node = current_node.links.get(c);

            if (next_node == null) {
                if (i < lookup.length) {
                    current_node = null;
                }

                break;
            } else {
                current_node = next_node;
            }
        }

        return current_node;
    }

    #generate_suggestions(start_node) {
        if (start_node == null) {
            return [];
        }

        const suggestions = [];

        function dfs(node, s) {
            s = s + node.token;

            if (node.links.size === 0) {
                return suggestions.push(s);
            } else {
                for (let [_, child] of node.links) {
                    dfs(child, s);
                }
            }
        }

        for (let [_, child] of start_node.links) {
            dfs(child, '');
        }

        return suggestions;
    }
}
