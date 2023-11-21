import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa"

const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType:'prompt',
  includeAssets:['favicon.ico','apple-touch-icon.png','masked-isSecureContext.svg'],
  manifest:{
      "name": "Vite + React + Typescript + PWA",
      "short_name": "PWA App",
      "description": "A Progressive Web App created with Vite and React",
      "start_url": "/",
      "display": "standalone",
      "theme_color": "#171717",
      "background_color":'#e8ebf2',
      "orientation":'portrait',
      "icons": [
        {
          "src": "./vite.svg",
          "sizes": "32x32",
          "type": "image/png"
        }
      ]
    },
    devOptions: {
      enabled: true
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(manifestForPlugin),
],
})


