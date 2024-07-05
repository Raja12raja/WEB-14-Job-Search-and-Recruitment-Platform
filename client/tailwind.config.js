module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        '3xl': '60px 60px 60px 60px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        'custom-dark': '#222831',
      },
    },
  },
  plugins: [],
};
