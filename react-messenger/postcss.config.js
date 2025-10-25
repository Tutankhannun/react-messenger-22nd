// postcss.config.js
import tailwind from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

import plugin from "tailwindcss/plugin";
const scrollbarHide = plugin(({ addUtilities }) => {
  addUtilities({
    ".scrollbar-hide": {
      "-ms-overflow-style": "none" /* IE and Edge */,
      "scrollbar-width": "none" /* Firefox */,
    },
    ".scrollbar-hide::-webkit-scrollbar": {
      display: "none" /* Chrome, Safari, Opera */,
    },
  });
});

export default {
  plugins: [
    // Tailwind v4 엔진 + 내부 tailwind 플러그인들(forms/typography/커스텀)
    tailwind({
      plugins: [scrollbarHide].filter(Boolean),
    }),
    autoprefixer(),
  ],
};
