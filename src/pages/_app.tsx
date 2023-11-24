import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import MainLayout from "@/layouts/MainLayout";
import AWS from "aws-sdk";


export default function App({ Component, pageProps }: AppProps) {

    AWS.config.update({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID?? '',
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY?? ''
        }
    });

  return (
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
  )
}
