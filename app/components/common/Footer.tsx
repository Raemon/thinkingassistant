'use client'

import Link from "next/link"

export default function Footer() {
  return (
    <div className="w-full mt-auto">
      <div className="flex justify-end gap-3">
        <Link href="/terms-of-service">Terms of Service</Link>
        <Link href="/privacy-policy">Privacy Policy</Link>
      </div>
    </div>
  )
}