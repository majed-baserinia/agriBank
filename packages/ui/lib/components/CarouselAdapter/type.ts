import type { ReactNode } from '@tanstack/react-router'
import type { ReactElement } from 'react'

export interface CarouselType {
    children: ReactNode
    slidesPerView?: number
    breakpoints?: Record<string, any>
    hasArrowNavigation?: boolean
    hasPagination?: boolean
    hasTouchMove?: boolean
    isAutoplay?: boolean
    loop?: boolean
    spaceBetween?: number
    speed?: number
    delaytime?: string
    isLoading?: boolean
    isError?: boolean
    disable?: boolean
    skeletonLoading?: ReactElement
}

export type CarouselLayoutType = CarouselType & { title?: string }
