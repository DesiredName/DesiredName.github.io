export default function DrawHelperFunctions(canvas) {
    const ctx = canvas.getContext('2d');
    const area_size = parseInt(canvas.getAttribute('width'), 10);

    return {
        clear_bckg() {
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, area_size, area_size);
        },

        draw_bckg({ sx, sy, ex, ey }) {
            ctx.beginPath();
            ctx.setLineDash([10, 16]);
            ctx.strokeStyle = '#ccc';
            ctx.lineWidth = 3;
            ctx.moveTo(sx, sy);
            ctx.lineTo(ex, ey);
            ctx.stroke();

            ctx.beginPath();
            ctx.setLineDash([]);
            ctx.strokeStyle = '#ef0';
            ctx.lineWidth = 1;
            ctx.moveTo(area_size / 2, 0);
            ctx.lineTo(area_size / 2, area_size);
            ctx.moveTo(0, area_size / 2);
            ctx.lineTo(area_size, area_size / 2);
            ctx.stroke();

            ctx.beginPath();
            ctx.setLineDash([10, 16]);
            ctx.strokeStyle = 'rgba(120, 120, 0, 0.5)';
            ctx.moveTo(area_size / 4, 0);
            ctx.lineTo(area_size / 4, area_size);
            ctx.moveTo((3 * area_size) / 4, 0);
            ctx.lineTo((3 * area_size) / 4, area_size);
            ctx.moveTo(0, area_size / 4);
            ctx.lineTo(area_size, area_size / 4);
            ctx.moveTo(0, (3 * area_size) / 4);
            ctx.lineTo(area_size, (3 * area_size) / 4);
            ctx.stroke();
        },

        draw_marker({ marker_type, x, y }) {
            const d = 5;

            switch (marker_type) {
                case -1:
                    ctx.strokeStyle = '#0e0';
                    break;
                case 1:
                    ctx.strokeStyle = '#e00';
                    break;
            }

            ctx.beginPath();
            ctx.moveTo(x, y - d);
            ctx.lineTo(x, y + d);
            ctx.moveTo(x - d, y);
            ctx.lineTo(x + d, y);
            ctx.stroke();
        },
    };
}
