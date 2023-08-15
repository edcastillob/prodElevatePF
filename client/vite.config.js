import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Confirguracion puerto para Socket 
  // server: {
  //   proxy: {
  //     '/socket.io': {
  //       target: 'http://localhost:3001/',
  //       ws: true
  //     }
  //   }
  // }
})
