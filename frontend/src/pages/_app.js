import '../styles/global.css' // ✅ Import Tailwind or global styles here

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}