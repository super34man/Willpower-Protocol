// import '@fortawesome/fontawesome-free/js/all'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'
import Head from 'next/head'
import { MoralisProvider } from "react-moralis";
import { useEffect } from "react";
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
	useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min");
		// import('@fortawesome/fontawesome-free/js/all');
  }, []);

  return (
		<MoralisProvider appId={process.env.NEXT_PUBLIC_APP_ID} serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}>
			<Head>
        <title>{ "Willpower Protocol" }</title>
        <meta name="description" content="Generated by create next app" />
				<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</MoralisProvider>
	)
}

export default MyApp
