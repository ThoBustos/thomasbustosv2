import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            color: 'black',
            fontSize: 100,
            fontWeight: 700,
            fontFamily: 'serif',
            letterSpacing: '-2px',
          }}
        >
          TB
        </span>
      </div>
    ),
    { ...size }
  )
}
