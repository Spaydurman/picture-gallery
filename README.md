# Picture Gallery with Tailwind CSS

This project is a picture gallery application built with React, TypeScript, and Vite, now enhanced with Tailwind CSS for styling.

## Tailwind CSS Setup

Tailwind CSS v4 has been configured in this project with:

- Tailwind directives in `src/index.css`
- Configuration in `tailwind.config.js`
- Vite integration using `@tailwindcss/vite` plugin in `vite.config.ts`

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode with Tailwind CSS processing.

### `npm run build`
Builds the app for production with Tailwind CSS optimized.

### `npm run tailwind`
Builds Tailwind CSS separately (useful for debugging).

### `npm run tailwind:watch`
Watches for changes in CSS files and rebuilds Tailwind CSS.

## Using Tailwind CSS

To use Tailwind classes in your components:

1. Add classes directly to your JSX elements:
   ```jsx
   <div className="bg-blue-500 text-white p-4 rounded-lg">
     Example using Tailwind classes
   </div>
   ```

2. Tailwind classes are already being used in the ImageTrail component.

## Learn More

To learn more about Tailwind CSS, check out the [official documentation](https://tailwindcss.com/docs).

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
