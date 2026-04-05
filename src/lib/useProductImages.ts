'use client'

import { useState, useEffect } from 'react'
import { PRODUCT_IMAGES as STATIC_IMAGES } from '@/data/product-images'

const REPO = 'Byrondh1/lumos-paola'
const BRANCH = 'main'
const IMAGE_EXTS = /\.(jpg|jpeg|png|webp|gif|avif)$/i
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`

let cached: Record<string, string[]> | null = null

async function loadFromGitHub(): Promise<Record<string, string[]>> {
  if (cached) return cached

  const res = await fetch(
    `https://api.github.com/repos/${REPO}/git/trees/${BRANCH}?recursive=1`,
    { headers: { Accept: 'application/vnd.github+json' } }
  )
  const data = await res.json()

  const result: Record<string, string[]> = {}
  for (const item of data.tree ?? []) {
    const m = (item.path as string | undefined)?.match(
      /^public\/images\/products\/([^/]+)\/([^/]+)$/
    )
    if (m && IMAGE_EXTS.test(m[2])) {
      if (!result[m[1]]) result[m[1]] = []
      result[m[1]].push(`${RAW_BASE}/public/images/products/${m[1]}/${m[2]}`)
    }
  }
  for (const id of Object.keys(result)) result[id].sort()

  cached = result
  return result
}

/**
 * Returns product images loaded live from GitHub.
 * Falls back to the build-time static manifest while fetching.
 */
export function useProductImages(): Record<string, string[]> {
  const [images, setImages] = useState<Record<string, string[]>>(STATIC_IMAGES)

  useEffect(() => {
    loadFromGitHub()
      .then(setImages)
      .catch(() => {/* keep static fallback on error */})
  }, [])

  return images
}
