'use client'
import { memo, useEffect, useState } from 'react'
import langColors from '@/constans/langColors'
import { useMount } from '@/hooks/mount'
import { config } from '@react-spring/web'
import TextTransition from './TextTransition'

const LangTextAnimation = ({ items }: { items: string[] }) => {
  const mounted = useMount()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => setIndex((index) => (index === items.length - 1 ? 0 : index + 1)), 3000)
    return () => clearTimeout(intervalId)
  }, [items])

  return (
    <>
      {mounted && (
        <div className="relative inline-block text-sm font-bold">
          <TextTransition springConfig={config.wobbly} inline>
            {items[index]}
          </TextTransition>
          <span
            className="absolute -right-6 top-1/2 block h-[1em] w-[1em] -translate-y-1/2 rounded-full pt-px transition-colors duration-500"
            style={{ backgroundColor: langColors[items[index]] }}
          />
        </div>
      )}
    </>
  )
}

export default memo(LangTextAnimation)
