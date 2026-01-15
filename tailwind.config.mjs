import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                // Define custom colors if needed, but strict requirements said "Minimalist monochrome (White/Black) with Green accents (text-green-600)"
                // We can rely on default Tailwind colors for this.
            }
        },
    },
    plugins: [typography],
    darkMode: 'class',
};
