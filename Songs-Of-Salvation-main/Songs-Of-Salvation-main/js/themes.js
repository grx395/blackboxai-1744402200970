const themes = {
    softSky: {
        name: 'Soft Sky',
        from: 'from-blue-50',
        to: 'to-indigo-100',
        accent: 'blue',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-blue-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-blue-200/50',
        border: 'border-blue-50'
    },
    peachBlossom: {
        name: 'Peach Blossom',
        from: 'from-orange-50',
        to: 'to-rose-50',
        accent: 'rose',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-rose-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-rose-200/50',
        border: 'border-rose-50'
    },
    mintDew: {
        name: 'Mint Dew',
        from: 'from-emerald-50',
        to: 'to-teal-100',
        accent: 'emerald',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-emerald-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-emerald-200/50',
        border: 'border-emerald-50'
    },
    lavenderMist: {
        name: 'Lavender Mist',
        from: 'from-purple-50',
        to: 'to-fuchsia-100',
        accent: 'purple',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-purple-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-purple-200/50',
        border: 'border-purple-50'
    },
    morningLight: {
        name: 'Morning Light',
        from: 'from-amber-50',
        to: 'to-yellow-100',
        accent: 'amber',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-amber-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-amber-200/50',
        border: 'border-amber-50'
    },
    cottonCandy: {
        name: 'Cotton Candy',
        from: 'from-pink-50',
        to: 'to-purple-100',
        accent: 'pink',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-pink-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-pink-200/50',
        border: 'border-pink-50'
    },
    oceanBreeze: {
        name: 'Ocean Breeze',
        from: 'from-cyan-50',
        to: 'to-sky-100',
        accent: 'cyan',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-cyan-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-cyan-200/50',
        border: 'border-cyan-50'
    },
    pearGarden: {
        name: 'Pear Garden',
        from: 'from-lime-50',
        to: 'to-green-100',
        accent: 'lime',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-lime-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-lime-200/50',
        border: 'border-lime-50'
    },
    moonlitSand: {
        name: 'Moonlit Sand',
        from: 'from-stone-50',
        to: 'to-warmGray-100',
        accent: 'stone',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-stone-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-stone-200/50',
        border: 'border-stone-50'
    },
    cherryPetal: {
        name: 'Cherry Petal',
        from: 'from-red-50',
        to: 'to-pink-50',
        accent: 'red',
        card: 'bg-white/80',
        text: 'text-slate-700',
        shadow: 'shadow-lg',
        shadowColor: 'shadow-red-100/50',
        hover: 'hover:-translate-y-1',
        hoverShadow: 'hover:shadow-xl',
        hoverShadowColor: 'hover:shadow-red-200/50',
        border: 'border-red-50'
    }
};

// Theme management
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeBtn');
    const themeModal = document.getElementById('themeModal');
    const closeThemeModal = document.getElementById('closeThemeModal');
    const themeOptions = document.getElementById('themeOptions');

    // Initialize theme
    const currentTheme = localStorage.getItem('theme') || 'softSky';
    applyTheme(currentTheme);

    // Setup theme modal
    if (themeBtn && themeModal && closeThemeModal && themeOptions) {
        // Function to update theme options
        const updateThemeOptions = () => {
            themeOptions.innerHTML = '<h3 class="col-span-4 text-xl font-semibold mb-6 text-center theme-text">Choose Your Theme</h3>';
            
            Object.entries(themes).forEach(([themeKey, theme]) => {
                const themeButton = document.createElement('div');
                themeButton.className = [
                    'aspect-square',
                    'rounded-xl',
                    theme.shadow,
                    theme.shadowColor,
                    'cursor-pointer',
                    'relative',
                    'group',
                    'overflow-hidden',
                    'bg-gradient-to-br',
                    theme.from,
                    theme.to,
                    'transform',
                    'transition-all',
                    'duration-300',
                    theme.hover,
                    theme.hoverShadow,
                    theme.hoverShadowColor
                ].join(' ');
                
                themeButton.innerHTML = `
                    <div class="absolute inset-0 opacity-50 mix-blend-overlay bg-pattern"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="text-center px-4 py-2 rounded-lg ${theme.card} backdrop-blur-sm transform transition-transform duration-300 group-hover:scale-110 border ${theme.border}">
                            <span class="${theme.text} font-medium">${theme.name}</span>
                        </div>
                    </div>
                    <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <i class="fas fa-paint-brush ${theme.text} text-lg"></i>
                    </div>
                `;
                
                themeButton.addEventListener('click', () => {
                    applyTheme(themeKey);
                    themeModal.classList.add('hidden');
                    themeModal.classList.remove('flex');
                });
                
                themeOptions.appendChild(themeButton);
            });
        };

        // Show modal and update options
        themeBtn.addEventListener('click', () => {
            themeModal.classList.remove('hidden');
            themeModal.classList.add('flex');
            updateThemeOptions();
        });

        // Close modal
        closeThemeModal.addEventListener('click', () => {
            themeModal.classList.add('hidden');
            themeModal.classList.remove('flex');
        });
    }
});

function applyTheme(themeName) {
    const theme = themes[themeName] || themes['softSky']; // Fallback to softSky if theme not found
    const body = document.body;

    // Remove existing theme classes from body
    Object.values(themes).forEach(t => {
        body.classList.remove(t.from, t.to, t.text);
    });

    // Apply new theme to body with transition
    body.style.transition = 'all 0.5s ease';
    body.classList.add(theme.from, theme.to, 'bg-gradient-to-br');

    // Update all cards and elements
    document.querySelectorAll('.song-card, .modal-content, .search-section').forEach(el => {
        // Remove old theme classes
        Object.values(themes).forEach(t => {
            el.classList.remove(
                t.card, t.text, t.shadow, t.hover, t.border,
                `text-${t.accent}-500`, `text-${t.accent}-600`,
                `hover:text-${t.accent}-600`, `hover:text-${t.accent}-700`
            );
        });

        // Add new theme classes with enhanced 3D effect
        el.classList.add(
            theme.card,
            theme.shadow,
            theme.shadowColor,
            theme.hover,
            theme.hoverShadow,
            theme.hoverShadowColor,
            'backdrop-blur-sm',
            'transition-all',
            'duration-300',
            'transform',
            'hover:scale-[1.02]',
            'border',
            theme.border
        );
    });

    // Update text colors with smooth transition
    document.querySelectorAll('.theme-text').forEach(el => {
        el.classList.add(theme.text, 'transition-colors', 'duration-300');
    });

    // Update accent colors with hover effects
    document.querySelectorAll('[data-accent]').forEach(el => {
        el.classList.add(
            `text-${theme.accent}-500`,
            `hover:text-${theme.accent}-600`,
            'transition-colors',
            'duration-300'
        );
    });

    // Update buttons with enhanced 3D effect
    document.querySelectorAll('.theme-button').forEach(el => {
        el.classList.add(
            `bg-${theme.accent}-500`,
            `hover:bg-${theme.accent}-600`,
            'text-white',
            'transform',
            'hover:-translate-y-0.5',
            'hover:shadow-lg',
            `hover:shadow-${theme.accent}-200/50`,
            'active:translate-y-0',
            'transition-all',
            'duration-300'
        );
    });

    // Store theme preference
    localStorage.setItem('theme', themeName);
}
