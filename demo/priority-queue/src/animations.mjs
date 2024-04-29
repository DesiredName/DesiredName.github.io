export const show_block = {
    backgroundColor: ['var(--bright)', 'var(--bright)', 'var(--brownish)'],
    offset: [0, 0.3, 1],
    opacity: [0, 1, 1],
    transform: ['translateX(-200px)', 'translateX(-200px)', 'translateX(0)'],
};

export const hide_block = {
    backgroundColor: ['var(--brownish)', 'var(--vine)', 'var(--vine)'],
    offset: [0, 0.7, 1],
    opacity: [1, 1, 0],
    transform: ['translateX(0)', 'translateX(200px)', 'translateX(200px)'],
};

export const anim_params = {
    duration: 500,
    easing: 'linear',
    fill: 'forwards',
    iterations: 1,
};
