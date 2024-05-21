const to_node_data = (node) =>
    JSON.stringify({
        key: node.key,
        prev: node.previous?.key ?? null,
        next: node.next?.key ?? null,
    });

const to_item_data = (item) => JSON.stringify(item);

export const add_node = (nodes_container, items_container, head) => {
    const el_node = document.createElement('div');

    el_node.id = `node-${head.key}`;
    el_node.className = 'node';
    el_node.textContent = to_node_data(head);

    nodes_container.insertBefore(el_node, nodes_container.children[0]);

    const el_item = document.createElement('div');

    el_item.id = `item-${head.key}`;
    el_item.className = 'item';
    el_item.textContent = to_item_data(head.item);

    items_container.insertBefore(el_item, items_container.children[0]);

    update_node(nodes_container, items_container, head.next, false);
};

export const update_node = (
    nodes_container,
    items_container,
    node,
    is_first = true,
) => {
    if (node == null) {
        return;
    } else {
        const el_node = nodes_container.querySelector(`#node-${node.key}`);
        el_node.textContent = to_node_data(node);

        const el_item = items_container.querySelector(`#item-${node.key}`);
        el_item.textContent = to_item_data(node.item);

        if (is_first === true) {
            nodes_container.insertBefore(el_node, nodes_container.children[0]);
            items_container.insertBefore(el_item, items_container.children[0]);
        }

        update_node(nodes_container, items_container, node.next, false);
    }
};

export const delete_node = (nodes_container, items_container, node) => {
    const el_node = nodes_container.querySelector(`#node-${node.key}`);

    el_node.remove();

    const el_item = items_container.querySelector(`#item-${node.key}`);

    el_item.remove();
};
