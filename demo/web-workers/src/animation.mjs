export default function AnimationHelper(output) {
    let timer_id;
    let last = 0;
    let elapsed = 0;

    const format = Intl.DateTimeFormat('en', {
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
    });

    const draw_ticks = (ticks) => (output.textContent = format.format(ticks));

    function animate(ts) {
        elapsed += ts - last;
        last = ts;

        draw_ticks(elapsed);
        
        timer_id = requestAnimationFrame(animate);
    }

    draw_ticks(0);
    
    return {
        start() {
            last = document.timeline.currentTime;
            animate(last);
        },

        stop() {
            cancelAnimationFrame(timer_id);
            elapsed = 0;
        },
    };
}
