import { Layout } from "../components/layout/layout";
import '../styles/global.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </Layout>
  );
}

export default MyApp;
