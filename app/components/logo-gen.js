"use client";

import { useState } from 'react';

const STYLES = [
    'flashy',
    'tech',
    'corporate',
    'creative'
];

const MODELS = [
    'stability-ai/sdxl',
    'dall-e-3',
    'black-forest-labs/flux-schnell',
    'black-forest-labs/flux-dev'
];

const SIZES = ['256x256', '512x512', '1024x1024'];
const QUALITIES = ['standard', 'hd'];

const LogoGenerator = () => {
    const [formData, setFormData] = useState({
        companyName: '',
        style: 'corporate',
        primaryColor: '#000000',
        backgroundColor: '#ffffff',
        model: 'black-forest-labs/flux-schnell',
        size: '512x512',
        quality: 'standard'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [generatedLogo, setGeneratedLogo] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const generatePrompt = () => {
        return `A single logo, high-quality, award-winning professional design, made for both digital and print media for ${formData.companyName}. Style: ${formData.style}. Primary color: ${formData.primaryColor}, Background color: ${formData.backgroundColor}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const [width, height] = formData.size.split('x').map(Number);

            const response = await fetch('/api/logo-generation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    width,
                    height,
                    prompt: generatePrompt(),
                    model: formData.model,
                    quality: formData.quality
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate logo');
            }

            if (data.url) {
                setGeneratedLogo(data.url);
            } else {
                throw new Error('No image URL in response');
            }
        } catch (err) {
            setError('Failed to generate logo: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/95 p-4 sm:p-6 md:p-8 border border-gray-200/50 rounded-xl md:rounded-2xl shadow-xl">
            <div className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Logo Generator</h2>
                <p className="text-sm md:text-base text-gray-600 mt-2">Create unique logos powered by AI & ML</p>
            </div>
            <div className="space-y-6 md:space-y-8">
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="companyName" className="block font-medium text-gray-700">Company Name</label>
                        <input
                            id="companyName"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            required
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white text-gray-800"
                            placeholder="Enter your company name"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">Style</label>
                        <select
                            value={formData.style}
                            onChange={(e) => handleSelectChange('style', e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white text-gray-800"
                        >
                            {STYLES.map(style => (
                                <option key={style} value={style}>
                                    {style.charAt(0).toUpperCase() + style.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700 text-sm md:text-base">Primary Color</label>
                            <input
                                type="color"
                                name="primaryColor"
                                value={formData.primaryColor}
                                onChange={handleInputChange}
                                className="w-full h-10"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700 text-sm md:text-base">Background Color</label>
                            <input
                                type="color"
                                name="backgroundColor"
                                value={formData.backgroundColor}
                                onChange={handleInputChange}
                                className="w-full h-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block font-medium text-gray-700">AI Model</label>
                        <select
                            value={formData.model}
                            onChange={(e) => handleSelectChange('model', e.target.value)}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white text-gray-800"
                        >
                            {MODELS.map(model => (
                                <option key={model} value={model}>{model}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700 text-sm md:text-base">Image Size</label>
                            <select
                                value={formData.size}
                                onChange={(e) => handleSelectChange('size', e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white text-gray-800"
                            >
                                {SIZES.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="block font-medium text-gray-700 text-sm md:text-base">Quality</label>
                            <select
                                value={formData.quality}
                                onChange={(e) => handleSelectChange('quality', e.target.value)}
                                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-white text-gray-800"
                            >
                                {QUALITIES.map(quality => (
                                    <option key={quality} value={quality}>
                                        {quality.toUpperCase()}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 md:p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm md:text-base rounded-xl hover:opacity-90 disabled:opacity-50 transition-all duration-200 font-medium shadow-lg shadow-purple-500/30"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Generating...
                            </span>
                        ) : 'Generate Logo'}
                    </button>
                </form>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-500 rounded-xl border border-red-100">
                        <p className="flex items-center">
                            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </p>
                    </div>
                )}

                {generatedLogo && (
                    <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-gray-200/50">
                        <h3 className="text-base md:text-lg font-medium text-gray-700 mb-3 md:mb-4">Generated Logo</h3>
                        <img
                            src={generatedLogo}
                            alt="Generated Logo"
                            className="w-full rounded-lg shadow-lg mb-3 md:mb-4"
                        />
                        <div className="flex justify-center mt-4 md:mt-6">
                            <button
                                onClick={async () => {
                                    try {
                                        const response = await fetch('/api/download-logo', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ imageUrl: generatedLogo })
                                        });

                                        if (!response.ok) throw new Error('Download failed');

                                        const blob = await response.blob();
                                        const url = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = url;
                                        link.download = `${formData.companyName.toLowerCase().replace(/\s+/g, '-')}-logo.jpg`;
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                        window.URL.revokeObjectURL(url);
                                    } catch (err) {
                                        setError('Failed to download logo: ' + err.message);
                                    }
                                }}
                                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:opacity-90 transition-all duration-200 font-medium shadow-lg shadow-purple-500/30 transform hover:scale-105"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                Download Logo
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogoGenerator;
