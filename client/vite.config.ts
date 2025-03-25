import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// export default defineConfig({
//   server: {
//     host: "0.0.0.0", // Allow external access
//     port: 5173, // Ensure this matches your setup
//     strictPort: true, // Prevents Vite from changing ports
//     hmr: {
//       protocol: "ws",
//       host: "localhost", // Change this if using Docker
//       port: 5173,
//     },
//   },
// });
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['js-cookie'], // Explicitly optimize js-cookie
  },
  server: {
    watch: {
      usePolling: true, // Ensures changes are detected in Docker
      interval: 100, // Adjust as needed (lower = faster, higher = less CPU usage)
    },
    host: "0.0.0.0", // Allows connections from outside the container
    port: 5173, // Change if needed
    strictPort: true, // Ensures the exact port is used
    // cors: true, // Allow cross-origin requests if needed
    cors: {
      // origin: 'http://localhost:5173', // Allow requests from this origin
      credentials: true, // Allow cookies
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 5173,
  },
});