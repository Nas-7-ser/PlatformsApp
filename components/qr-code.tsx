"use client"

import { useEffect, useRef } from "react"
import QRCode from "qrcode"

interface QRCodeProps {
  url: string
  size?: number
}

export function QRCodeComponent({ url, size = 128 }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, { width: size }, (error) => {
        if (error) console.error("Error generating QR code", error)
      })
    }
  }, [url, size])

  return <canvas ref={canvasRef} />
}

