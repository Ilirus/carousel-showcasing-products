import Button from '@components/common/button/Button'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useState, useEffect, useRef, useCallback, useMemo, type FC, type ReactNode, Children, isValidElement, cloneElement } from 'react'

export interface CarouselProps {
    children: ReactNode[]
    className?: string
}

const Carousel: FC<CarouselProps> = ({ children, className = '' }) => {
    const [
        currentIndex,
        setCurrentIndex,
    ] = useState(0)
    const [
        numVisible,
        setNumVisible,
    ] = useState(1)
    const carouselRef = useRef<HTMLDivElement>(null)

    const duplicatedElements = useMemo(() => {
        const childrenFromEnd = Children.map(
            children.slice(children.length - 1),
            (child) => isValidElement(child) ? cloneElement(child, { key: child.key + '-start' }) : child
        ) || []
        const childrenFromStart = Children.map(
            children.slice(0, numVisible),
            (child) => isValidElement(child) ? cloneElement(child, { key: child.key + '-end' }) : child
        ) || []
        return children.length > numVisible ? [
            ...childrenFromEnd,
            ...children,
            ...childrenFromStart,
        ] : children
    }, [
        children,
        numVisible,
    ])

    const isChildrenEnough = children.length > numVisible
    const effectiveIndex = currentIndex + numVisible

    useEffect(() => {
        const setDefaultCurrentIndex = () => {
            setCurrentIndex(0)
        }
        setDefaultCurrentIndex()
    }, [children])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setNumVisible(3)
            } else if (window.innerWidth >= 768) {
                setNumVisible(2)
            } else {
                setNumVisible(1)
            }
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleTransitionEnd = useCallback(() => {
        if (effectiveIndex >= children.length + numVisible) {
            setCurrentIndex(0)
            if (carouselRef.current) {
                carouselRef.current.style.transitionDuration = '0s'
            }
        } else if (effectiveIndex < numVisible) {
            setCurrentIndex(children.length - 1)
            if (carouselRef.current) {
                carouselRef.current.style.transitionDuration = '0s'
            }
        }
    }, [
        effectiveIndex,
        children.length,
        numVisible,
    ])

    useEffect(() => {
        const carouselElement = carouselRef.current
        if (carouselElement) {
            carouselElement.addEventListener('transitionend', handleTransitionEnd)
        }
        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('transitionend', handleTransitionEnd)
            }
        }
    }, [handleTransitionEnd])

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
        if (carouselRef.current) {
            carouselRef.current.style.transitionDuration = '300ms'
        }
    }

    const nextSlide = () => {
        goToSlide(currentIndex + 1 > children.length ? currentIndex : currentIndex + 1)
    }

    const prevSlide = () => {
        goToSlide(currentIndex - 1 < -1 ? currentIndex : currentIndex - 1)
    }

    const realNumVisible = isChildrenEnough ? numVisible : duplicatedElements.length

    return (
        <div className={`relative w-full max-w-7xl flex items-center gap-1 md:gap-2 justify-between py-4 ${className}`}>
            <Button
                title='Previous slide'
                disabled={!isChildrenEnough}
                isReverse
                isFilled
                isFBA
                onClick={prevSlide}
            >
                <ChevronLeftIcon className='size-6 sm:size-7 md:size-8'/>
            </Button>
            <div
                className="flex flex-col h-full overflow-hidden relative"
            >
                <div
                    ref={carouselRef}
                    className={`flex grow items-center ${isChildrenEnough && 'transition-transform ease-in-out'}`}
                    style={{
                        transform: isChildrenEnough ? `translateX(${-((effectiveIndex - numVisible + 1) * 100) / numVisible}%)` : 'none',
                        transitionDuration: isChildrenEnough ? 'initial' : '0s',
                    }}
                >
                    {
                        Children.map(
                            duplicatedElements,
                            (element) => {
                                return isValidElement(element) ? (
                                    <div
                                        key={element.key}
                                        className="flex justify-center shrink-0"
                                        style={{ width: `${100 / realNumVisible}%` }}
                                    >
                                        {element}
                                    </div>
                                ) : null
                            })
                    }
                </div>
            </div>
            <Button
                title='Next slide'
                isReverse
                isFilled
                isFBA
                disabled={!isChildrenEnough}
                onClick={nextSlide}
            >
                <ChevronRightIcon className='size-6 sm:size-7 md:size-8'/>
            </Button>
            {isChildrenEnough && (
                <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-4">
                    {children.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${(index - currentIndex + children.length) % children.length === 0 ? 'bg-yellow-400' : 'bg-gray-400'}`}
                            onClick={() => goToSlide(index)}
                            role="button"
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Carousel
