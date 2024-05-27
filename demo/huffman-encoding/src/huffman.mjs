import PriorityQueueBuilder, {
    PriorityQueueOrdering,
} from '/utils/priority-queue.mjs';

const build_node = (char, freq, left = null, right = null) => ({
    char,
    freq,
    left,
    right,
});

export const HuffmanEncode = (token) => {
    // step0. check
    if (token.length === 0) {
        return {
            token,
            huffman_tree: null,
            huffman_codes: new Map(),
            huffman_encoded: [],
            size: {
                token_size: 0,
                token_encoded_size: 0,
                token_table_size: 0,
            },
        };
    }

    // step1. compute frequency map
    const huffman_pq = new PriorityQueueBuilder(
        'freq',
        PriorityQueueOrdering.MIN_FIRST,
    );
    const char_table = new Map(/* char, node */);

    for (let char of token) {
        const node = char_table.get(char);

        if (node == null) {
            char_table.set(char, build_node(char, 1));
        } else {
            node.freq += 1;
        }
    }

    for (const [_, node] of char_table) {
        huffman_pq.enqueue(node);
    }

    // step2. build Huffman tree
    let huffman_tree = null;

    while (huffman_pq.size() > 1) {
        let node_1 = huffman_pq.dequeue();
        let node_2 = huffman_pq.dequeue();
        let hf_node = null;

        if (node_1 == null && node_2 == null) {
            break;
        } else if (node_2 == null) {
            hf_node = build_node(null, node_1.freq, node_1);
        } else {
            hf_node = build_node(
                null,
                node_1.freq + node_2.freq,
                node_1,
                node_2,
            );
        }

        huffman_pq.enqueue(hf_node);
    }

    const node = huffman_pq.dequeue();

    if (node.left == null && node.right == null) {
        // special case, when text contains just single char
        huffman_tree = build_node(null, node.freq, node);
    } else {
        huffman_tree = node;
    }

    // step3. create char to code map
    const huffman_codes = new Map(/* char, code */);

    const dfs = (node, code) => {
        if (node == null) {
            return;
        } else if (node.char == null) {
            dfs(node.left, code.concat(0));
            dfs(node.right, code.concat(1));
        } else {
            return huffman_codes.set(node.char, code);
        }
    };

    dfs(huffman_tree, []);

    // step4. encode original string using codes
    const huffman_encoded = [];

    for (let char of token) {
        huffman_encoded.push(...huffman_codes.get(char));
    }

    // step5. output
    const token_size = 8 * token.length;
    const token_encoded_size = huffman_encoded.length;

    return {
        token,
        huffman_tree,
        huffman_codes,
        huffman_encoded,
        size: {
            token_size,
            token_encoded_size,
            token_table_size: JSON.stringify(Array.from(huffman_codes)).length,
        },
    };
};

export const HuffmanDecode = (huffman_tree, huffman_encoded) => {
    if (huffman_encoded.length === 0) {
        return '';
    }

    let decoded = '';
    let node = huffman_tree;
    for (let digit of huffman_encoded) {
        if (digit === 0) {
            node = node.left;
        } else {
            node = node.right;
        }

        if (node.char != null) {
            decoded = decoded + node.char;
            node = huffman_tree;
        }
    }

    console.log(decoded);
};
