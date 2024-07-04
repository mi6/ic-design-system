export const createIndexTsx = () => `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;

export const createAppTsx = () => `import React from 'react';
import Subscription from './components/Subscription/Subscription';
import './App.css'

const App: React.FC = () => {

  return (
    <>
      <Subscription/>
    </>
  )
}

export default App`;

export const createAppCss = () => `.wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--ic-space-md);
}`;

export const createIndexCss = (main: boolean) => {
  return (main ? `@import "@ukic/react/dist/core/normalize.css";
@import "@ukic/fonts/dist/fonts.css";
@import "@ukic/react/dist/core/core.css";
@import "@ukic/canary-react/dist/core/core.css";

body {
  height: 100%;
  width: 100%;
}` : `body {
  margin: 0;
  padding: 0;
}

ic-section-container {
  margin: 1rem 8rem;
  width: 70vw;
}

ic-typography {
  margin-top: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-container {
  margin: 2rem 0;
}

.input {
  margin-top: 0.5rem;
}

.button {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}`)}



export const createReactIndexHTML = () => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ICDS Test App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>`;

export const packageJson = () => {
  const dependencies = {
    "@ukic/fonts": "^2.6.0",
    "@ukic/react": "^2.2.0",
    "@ukic/canary-react": "^2.0.0-canary.19",
    "@ukic/canary-web-components": "^2.0.0-canary.19",
    "prettier": "^3.3.3",
    "ts-node": "^10.9.2",
    "vite-jest": "^0.1.4",
  }

  const devDependencies = {
    "vite": "^5.0.12",
    "@babel/cli": "^7.24.8",
    "@babel/core": "^7.24.9",
    "@babel/plugin-syntax-jsx": "^7.24.7",
    "@babel/preset-env": "^7.24.8",
    "@babel/preset-react": "^7.24.7",
    "@babel/preset-typescript": "^7.24.7",
    "@jest/globals": "^29.7.0",
    "@testing-library/dom": "^10.3.2",
    "@testing-library/jest-dom": "^6.4.6",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/jest": "^29.5.12",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.0.3",
    "babel-jest": "^29.7.0",
    "eslint": "^8.45.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "shadow-dom-testing-library": "^1.11.2",
    "ts-jest": "^29.2.2",
    "typescript":"^5.0.2"
  };

  return {
    name: `icds-jest-testing`,
    version: "0.0.0",
    private: true,
    scripts: {
      "develop": "vite",
      "build": "tsc && vite build",
      "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
      "preview": "vite preview",
      "prettier": "prettier --config ../../.prettierrc.json --ignore-path ../../.prettierignore src --check",
      "prettier:fix": "prettier --config ../../.prettierrc.json --ignore-path ../../.prettierignore src --write",
      "test": "jest --watchAll"
    },
    dependencies: { ...dependencies },
    devDependencies: { ...devDependencies },
    stackblitz: {
      startCommand:
        "npm i --force &&  npm run test"
       
    },
  };
};

export const tsConfig = `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["jest", "node"],
    "esModuleInterop": true,
  },
  "include": ["src", "jest.config.js"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`;

export const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`;

export const jestConfig = `import type { Config } from 'jest'

const config: Config = {
  preset: "ts-jest",
  testEnvironment: 'jsdom',
  transform: {
      "^.+\\.tsx?$": "ts-jest",
      "^.+\\.js[x]?$": "babel-jest",
  },
  transformIgnorePatterns: [
    // "/node_modules/(?!@ukic/canary-react)",
    // "/node_modules/(?!@ukic/react)"
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy"
  }
};

export default config`

export const babelConfig = `module.exports = {
    presets: [
        ['@babel/preset-env', {targets: {node: 'current'}}],
        "@babel/typescript"
    ],
};
`

export const lintConfig = `module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
`
