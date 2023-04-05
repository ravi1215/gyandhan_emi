import Calculator from '@/components/calculator';
import Chatbot from '@/components/chatbot';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Gyandhan Chatbot</title>
        <meta name="description" content="Gyandhan chatbot to help you easily understand study abroad options and Education loans process." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100'></div>
        <div className='absolute w-full h-full bg-transparent min-h-screen max-h-screen'>
          <div className='flex items-center justify-center'>
            <div className='flex flex-col min-h-screen'>
              <div>
                <div className='mb-6 mt-6'>
                  <h1
                    className='bg-gradient-to-br from-blue-400 mb-4 to-green-500 bg-clip-text text-center font-display text-4xl font-bold text-transparent drop-shadow-sm md:text-7xl'
                  >
                    GyanDhan Chatbot
                  </h1>
                  <p
                    className='text-center text-gray-500 mx-2 md:text-xl'
                  >
                    Chatbot to help you easily understand study abroad options and Education loans process.
                  </p>
                </div>
                <Calculator />
              </div>
              <Chatbot />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
