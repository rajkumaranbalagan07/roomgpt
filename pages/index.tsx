import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { UploderButton } from '@/components/UploderButton'

export default function Home() {
  return (
    <div>
      <Head>
        <title>RoomGPT</title>
        <meta name="description" content="Generated AI ROOMS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>          
         <UploderButton></UploderButton>        
      </main>
    </div>
  )
}
