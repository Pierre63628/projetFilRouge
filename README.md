# 🎮 EscapeXperience - La Maison Horrifique

A React TypeScript Vite application for an escape game website featuring immersive sessions and adventures.

## 🌐 Live Demo

**🚀 [Visit the live site](https://pes.github.io/ProjetReac/)**

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Vitest** - Testing framework
- **React Testing Library** - Component testing
- **GitHub Pages** - Deployment platform
- **GitHub Actions** - CI/CD pipeline

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run start

# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

### Testing

```bash
# Run tests in watch mode
npm test

# Run tests once
npm run test:run

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

- **CI/CD Pipeline**: Automated testing, linting, and deployment
- **Live Updates**: Every push to `main` branch triggers deployment
- **Quality Gates**: Tests must pass before deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
