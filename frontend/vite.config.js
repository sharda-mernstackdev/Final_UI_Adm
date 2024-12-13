import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 
export default defineConfig({
 
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000', // Ensure this points to the correct backend server
  //       changeOrigin: true,
  //       secure: false, // This might need to be set depending on your setup
  //     },
  //   },
  //   host:true,
  //   port:80,
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})