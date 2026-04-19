const fs = require('fs');
const path = require('path');

// Step 1: Create ChatBotLoader.tsx
const loader = `"use client";
import dynamic from "next/dynamic";
const ChatBot = dynamic(() => import("./ChatBot"), { ssr: false });
export default function ChatBotLoader() { return <ChatBot />; }
`;

fs.writeFileSync(path.join(__dirname, 'app', 'components', 'ChatBotLoader.tsx'), loader);
console.log('✅ ChatBotLoader.tsx created');

// Step 2: Fix layout.tsx - remove dynamic import, use ChatBotLoader
const layoutPath = path.join(__dirname, 'app', 'layout.tsx');
let layout = fs.readFileSync(layoutPath, 'utf8');

// Remove the broken lines
layout = layout.replace(/import dynamic from "next\/dynamic";\n?/g, '');
layout = layout.replace(/import dynamic from 'next\/dynamic';\n?/g, '');
layout = layout.replace(/const ChatBotWrapper = dynamic\(\(\) => import\("\.\/components\/ChatBot"\), \{ ssr: false \}\);\n?/g, '');
layout = layout.replace(/const ChatBotWrapper = dynamic\(\(\) => import\('\.\/components\/ChatBot'\), \{ ssr: false \}\);\n?/g, '');

// Add ChatBotLoader import if not already there
if (!layout.includes('ChatBotLoader')) {
  layout = layout.replace(
    'import { LanguageProvider } from "./components/LanguageContext";',
    'import { LanguageProvider } from "./components/LanguageContext";\nimport ChatBotLoader from "./components/ChatBotLoader";'
  );
}

// Replace ChatBotWrapper with ChatBotLoader
layout = layout.replace(/ChatBotWrapper/g, 'ChatBotLoader');

// Make sure ChatBotLoader is in the JSX
if (!layout.includes('<ChatBotLoader />')) {
  layout = layout.replace(
    '{children}',
    '{children}\n          <ChatBotLoader />'
  );
}

fs.writeFileSync(layoutPath, layout);
console.log('✅ layout.tsx fixed');

console.log('\n🎉 Done! Now run: npm run build');