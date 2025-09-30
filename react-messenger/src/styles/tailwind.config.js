/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // 프로젝트의 파일 경로에 맞게 수정하세요.
  ],
  theme: {
    extend: {
      // 색상 시스템
      colors: {
        // 디자인 시스템 가이드의 Main Color, Black&White
        "main-blue": "#1A75FF",
        "main-blue-light": "#EAF2FE",
        black: "#000A19",
        white: "#FFFFFF",

        // Grayscale Palette
        grey: {
          "00": "#0B0E0F",
          "01": "#242628",
          "02": "#3D3F41",
          "03": "#56585A",
          "04": "#6F7173",
          "05": "#888A8C",
          "06": "#A1A3A5",
          "07": "#BABCBE",
          "08": "#E4E4E4",
          "09": "#ECEEF0",
          10: "#F6F8FA",
          11: "#F9FAFB",

          blue: {
            "00": "#001536",
            "01": "#002966",
            "02": "#003E9C",
            "03": "#0054D1",
            "04": "#005EEB",
            "05": "#0066FF",
            "06": "#1A75FF",
            "07": "#3385FF",
            "08": "#69A5FF",
            "09": "#9EC5FF",
            10: "#C9DEFE",
            11: "#EAF2FE",
          },
        },

        // Semantic Colors (역할 기반 색상 - 이미지 기반)
        fill: {
          normal: "#FFFFFF",
          strong: "#F9FAFB",
          hover: "#ECEEF0",
          inactive: "#F6F8FA",
          primary: "#1A75FF",
          "primary-assistive": "#F7FBFF",
          "primary-interactive": "#005EEB",
        },
        icon: {
          strong: "#3D3F41",
          normal: "#6F7173",
          assistive: "#BABCBE",
          inverse: "#FFFFFF",
          primary: "#1A75FF",
          "primary-interacive": "#005EEB",
        },
        text: {
          strong: "#242628",
          normal: "#3D3F41",
          assistive: "#6F7173",
          inverse: "#FFFFFF",
          primary: "#1A75FF",
        },
        line: {
          strong: "#E4E4E4",
          normal: "#ECEEF0",
          assistive: "#F6F8FA",
          inverse: "#FFFFFF",
        },
      },

      // 타이포그래피 시스템
      fontSize: {
        headline: ["22px", { lineHeight: "34px", letterSpacing: "-2%" }],
        "title-lg": ["18px", { lineHeight: "28px", letterSpacing: "-2%" }],
        "title-md": ["16px", { lineHeight: "24px", letterSpacing: "-2%" }],
        "title-sm": ["14px", { lineHeight: "22px", letterSpacing: "-2%" }],
        "body-md": ["14px", { lineHeight: "22px", letterSpacing: "-2%" }],
        "body-sm": ["12px", { lineHeight: "18px", letterSpacing: "-2%" }],
      },

      //폰트 패밀리 (Font Family)
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
