import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { imageUrl } = await request.json();

        const response = await fetch(imageUrl);
        const imageBlob = await response.blob();

        return new NextResponse(imageBlob, {
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'attachment; filename=logo.jpg',
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to download image: ' + error.message },
            { status: 500 }
        );
    }
}
