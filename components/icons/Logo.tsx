import { memo } from 'react'

const Logo = memo((props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 137.41 137.41" height={16} width={16} {...props}>
    <title>Logo DedeArd</title>
    <path d="M68.71 0a68.71 68.71 0 1068.7 68.71A68.71 68.71 0 0068.71 0zm26.21 82.92a12 12 0 01-12 12H54.49a12 12 0 01-12-12V54.49a12 12 0 0112-12h28.43a12 12 0 0112 12z"></path>
  </svg>
))

export default Logo
