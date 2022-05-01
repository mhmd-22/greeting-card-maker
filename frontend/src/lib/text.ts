export interface TextData {
	content: string;
	x: number;
	y: number;
	font: string;
	color: string;
	fontSize: number;
	textAlign: string;
}

export const defaultText: TextData = {
	content: 'الاسم هنا',
	x: 0.5,
	y: 0.5,
	color: '#ffffff',
	fontSize: 0.85,
	font: '"Noto Naskh Arabic"',
	textAlign: 'right'
};

export function renderImage(
	ctx: CanvasRenderingContext2D,
	text: TextData,
	img: HTMLImageElement,
	drawTextRect = false
) {
	const canvas = ctx.canvas;
	if (!canvas) return;
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.drawImage(img, 0, 0);

	const t = { ...defaultText, ...text };
	const fontSize = 48 * (canvas.width / 1280) * t.fontSize;

	const x = t.x * canvas.width;
	const y = t.y * canvas.height;
	ctx.fillStyle = t.color;

	ctx.font = `${fontSize}px ${t.font}`;
	ctx.textAlign = t.textAlign as CanvasTextAlign;
	ctx.fillText(t.content, x, y);

	if (drawTextRect) {
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = 4;
		const { l, b, t: top, m } = getTextBoundingRect(ctx, t.content);
		const mg = 50 * (canvas.width / 1920);
		ctx.strokeRect(x - l - mg / 2, y - top - mg / 2, m.width + mg, b + mg);
	}
}

function getTextBoundingRect(ctx: CanvasRenderingContext2D, text: string) {
	const m = ctx.measureText(text);
	const h = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent;
	return {
		l: m.actualBoundingBoxLeft,
		t: m.actualBoundingBoxAscent,
		b: h,
		m
	};
}

export function generateImage(url: string): Promise<HTMLImageElement> {
	return new Promise((resolve) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.crossOrigin = 'Anonymous';
		img.src = url;
	});
}
