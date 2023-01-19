import { Fragment, useEffect } from 'react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useImage } from '@/contexts/ImageContext'
import { IAboutPage } from '@/types'

const AboutPage = ({ head, body }: IAboutPage) => {
  const { setImages } = useImage()

  useEffect(() => {
    setImages([body.image.url])
  }, [])

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <meta name="og:title" content={head.title} />
        <meta name="og:description" content={head.description} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST + '/about'} />
      </Head>

      <h1 className="page-title" data-text={body.title}>
        {body.title}
      </h1>
      <div className="md:flex">
        <div className="mb-5 md:w-56">
          <Link href={'/about?img=' + body.image.url} shallow rel="nofollow">
            <img id={body.image.url} src={body.image.sm_url} alt={body.image.alt} className="block w-full" />
          </Link>
        </div>
        <div className="md:flex-1 md:pl-6">
          {Object.keys(body.contents).map((key) => (
            <Fragment key={key}>
              <h5 className="mb-2 text-xl font-bold">{body.contents[key].title}</h5>
              <div className="mb-6">
                <p className="mb-1" dangerouslySetInnerHTML={{ __html: body.contents[key].text }} />
              </div>
            </Fragment>
          ))}
          <Link
            href="/contact"
            rel="nofollow"
            className="inline-block bg-white px-5 py-3 hover:bg-black hover:text-white dark:bg-black dark:hover:bg-white dark:hover:text-black"
          >
            Contact me
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IAboutPage> = async () => {
  const data: IAboutPage = await fetch(process.env.NEXT_PUBLIC_FB_DATABASE_URL + '/about.json').then((res) => res.json())
  return {
    props: {
      ...data,
    },
  }
}

export default AboutPage
