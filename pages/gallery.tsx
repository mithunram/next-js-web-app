import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useImage } from '../contexts/ImageContext'
import { GetStaticProps } from 'next'
import { IGalleryPage } from '@/types'

const GalleryPage = ({ head, body }: PropsType) => {
  const { setImages } = useImage()
  useEffect(() => {
    setImages(Object.keys(body.images).map((key) => body.images[key].url))
  }, [])

  return (
    <>
      <Head>
        <title>{head.title}</title>
        <meta name="description" content={head.description} />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_HOST + '/gallery'} />
      </Head>
      <h1 className="page-title">
        {body.title}
        <span>{body.title}</span>
      </h1>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {Object.keys(body.images).map((key) => (
          <Link key={key} href={'/gallery?img=' + body.images[key].url} shallow rel="nofollow">
            <img
              id={body.images[key].url}
              src={body.images[key].sm_url}
              alt={body.images[key].alt}
              className="block w-full grayscale transition-[filter] hover:grayscale-0"
            />
          </Link>
        ))}
      </div>
    </>
  )
}

type PropsType = IGalleryPage & {
  title: string
}

export const getStaticProps: GetStaticProps<PropsType> = async () => {
  const data: IGalleryPage = await fetch(process.env.NEXT_PUBLIC_FB_DATABASE_URL + '/gallery.json').then((res) => res.json())
  return {
    props: {
      ...data,
      title: data?.body?.title || '',
    },
  }
}

export default GalleryPage
