import { PRODUCT_IMAGES } from '@/data/product-images'

export function useProductImages(): Record<string, string[]> {
  return PRODUCT_IMAGES
}
