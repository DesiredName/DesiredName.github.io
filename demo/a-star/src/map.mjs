export default {
    paths: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 2, 2, 0, 0],
        [0, 0, 2, 5, 0, 0, 0, 2, 0, 0],
        [0, 0, 5, 3, 0, 0, 0, 2, 0, 0],
        [0, 5, 5, 3, 0, 0, 0, 2, 2, 0],
        [0, 5, 3, 2, 2, 2, 2, 2, 3, 0],
        [0, 0, 4, 4, 2, 2, 2, 5, 0, 0],
        [0, 0, 0, 3, 2, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 2, 0, 0, 0, 0, 0],
    ],
    events: {
        2: {
            1: {
                type: ['text', 'goto'],
                text: "Too scarry, I'd better don't do this again",
                goto: [2, 2, 400],
                repeat: 1,
            },
            2: {
                type: ['text', 'goto'],
                text: "Oh, I didn't know I could climb a tree! Wow!...",
                goto: [2, 1, 400],
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
                repeat: 1,
            },
        },
        8: {
            5: {
                type: ['text', 'goto'],
                text: "Wow, that's a deadly pumpkin! I better stay away from it.",
                goto: [7, 5, 200],
            },
        },
    },
};
