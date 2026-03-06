import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
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
            fontSize: 18,
            fontWeight: 700,
            fontFamily: 'serif',
            letterSpacing: '-0.5px',
          }}
        >
          TB
        </span>
      </div>
    ),
    { ...size }
  )
}
