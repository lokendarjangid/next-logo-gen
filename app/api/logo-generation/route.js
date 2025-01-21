import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { width, height, prompt, model } = await request.json();

        if (!width || !height || !prompt || !model) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const response = await fetch('https://api.studio.nebius.ai/v1/images/generations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEBIUS_API_KEY}`,
            },
            body: JSON.stringify({
                width,
                height,
                num_inference_steps: 4,
                negative_prompt: '',
                seed: -1,
                response_extension: 'jpg',
                response_format: 'url',
                prompt,
                model,
            }),
        });

        const data = await response.json();

        if (!data.data?.[0]?.url) {
            return NextResponse.json(
                { error: 'No image URL in response' },
                { status: 500 }
            );
        }

        return NextResponse.json({ url: data.data[0].url });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to generate logo: ' + error.message },
            { status: 500 }
        );
    }
}
