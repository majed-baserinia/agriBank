import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'
import type { CarouselType } from './type'
import './stylele.css'
import 'swiper/css'

export const Carousel = (props: CarouselType) => {
    const {
        children,
        slidesPerView = 1,
        breakpoints,
        hasArrowNavigation = false,
        hasPagination = false,
        hasTouchMove = false,
        isAutoplay = true,
        loop = false,
        spaceBetween = 2,
        speed = 2000,
        delaytime = '2000',
        isLoading,
        isError,
        skeletonLoading,
    } = props

    const autoplayConfig = isAutoplay
        ? {
            delay: parseInt(delaytime, 10),
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        }
        : false

    return (
        <>
            {isLoading || isError ? (
                skeletonLoading || <p>Loading...</p>
            ) : (
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={hasArrowNavigation}
                    pagination={hasPagination ? { clickable: true } : false}
                    allowTouchMove={hasTouchMove}
                    slidesPerView="auto"
                    spaceBetween={spaceBetween}
                    speed={speed}
                    loop={loop}
                    breakpoints={breakpoints}
                    draggable
                    autoplay={autoplayConfig}
                >
                    {children}
                </Swiper>
            )}
        </>
    )
}
