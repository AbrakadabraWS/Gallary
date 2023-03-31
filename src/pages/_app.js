import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './_layout';
import { SSRProvider } from 'react-bootstrap';
import { Context } from '../../context/context.js';

export default function App({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Context>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Context>
    </SSRProvider>

  )
}
