export default {
    paths: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 2, 0, 0],
        [0, 0, 1, 4, 0, 0, 0, 1, 0, 0],
        [0, 0, 4, 2, 0, 0, 0, 1, 0, 0],
        [0, 4, 4, 2, 0, 0, 0, 1, 1, 0],
        [0, 4, 2, 1, 1, 1, 1, 1, 2, 0],
        [0, 0, 3, 3, 1, 1, 1, 4, 0, 0],
        [0, 0, 0, 2, 1, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    ],
    events: {
        2: {
            2: {
                type: ['text'],
                text: "Oh, I didn't realize I can climb the tree! Sweeet!!!",
            },
        },
        4: {
            5: {
                type: ['text'],
                text: "Darling, I'm going home!",
            },
        },
        6: {
            1: {
                type: ['text'],
                text: 'I wish I had a lighthouse here instead of this dumb tree...',
                repeat: 1,
            },
        },
        8: {
            5: {
                type: ['text', 'teleport'],
                text: "Wow, that is the deadly pumpking! I'd better go away from it.",
                teleport: [7, 5],
            },
        },
    },
};
