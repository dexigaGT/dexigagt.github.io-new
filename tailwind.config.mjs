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
    darkMode: 'class', // System-based with manual toggle requires 'class' strategy usually, or we can use the new v4 mechanism. 
    // In v4, dark mode is often just `@media (prefers-color-scheme: dark)` by default, but for manual toggle we need 'selector' or 'class'.
    // v4 uses `darkMode: 'selector'` by default if you want class-based? No, let's stick to standard 'class' for now or 'selector'.
    // User requested: "Dark Mode: System-based with a manual toggle." 
    // This usually means we check system pref, but allow override via class.
};
