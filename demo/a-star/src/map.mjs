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
                type: ['text', 'teleport'],
                text: "Oh, I didn't know I could climb a tree! Wow!...",
                teleport: [2, 1, 100],
                repeat: 1,
            },
            3: {
                type: ['text'],
                text: 'Swamps are dangerous!..',
            },
        },
        3: {
            4: {
                type: ['show'],
            },
            5: {
                type: ['show'],
            },
            6: {
                type: ['show'],
            },
            7: {
                type: ['text'],
                text: "The sign says: 'Keep away from my vegetables!'",
                repeat: 1,
            },
        },
        4: {
            5: {
                type: ['text', 'hide'],
                text: "Darling, I'm home!",
            },
            6: {
                type: ['show'],
            },
        },
        5: {
            5: {
                type: ['show'],
            },
            6: {
                type: ['show'],
            },
        },
        6: {
            1: {
                type: ['text'],
                text: 'I wish I had a lighthouse here instead of this stupid tree.....',
            },
        },
        8: {
            5: {
                type: ['text', 'teleport'],
                text: "Wow, that's a deadly pumpkin! I better stay away from it.",
                teleport: [7, 5, 100],
            },
        },
    },
};
