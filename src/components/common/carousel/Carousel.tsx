import React, { useState, useEffect, useRef, useCallback, useMemo, type ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export interface ICarouselProps {
  children: ReactNode[];
}

const Carousel: React.FC<ICarouselProps> = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [numVisible, setNumVisible] = useState(1);
    const carouselRef = useRef<HTMLDivElement>(null);

    const duplicatedElements = useMemo(() => {
        return [
            ...children.slice(children.length - 1),
            ...children,
            ...children.slice(0, numVisible),
        ];
    }, [children, numVisible]);

    const effectiveIndex = currentIndex + numVisible;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setNumVisible(3);
            } else if (window.innerWidth >= 768) {
                setNumVisible(2);
            } else {
                setNumVisible(1);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleTransitionEnd = useCallback(() => {
        if (effectiveIndex >= children.length + numVisible) {
            setCurrentIndex(0);
            if (carouselRef.current) {
                carouselRef.current.style.transitionDuration = '0s';
            }
        } else if (effectiveIndex < numVisible) {
            setCurrentIndex(children.length - 1);
            if (carouselRef.current) {
                carouselRef.current.style.transitionDuration = '0s';
            }
        }
    }, [effectiveIndex, children.length, numVisible]);

    useEffect(() => {
        const carouselElement = carouselRef.current;
        if (carouselElement) {
            carouselElement.addEventListener('transitionend', handleTransitionEnd);
        }
        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('transitionend', handleTransitionEnd);
            }
        };
    }, [handleTransitionEnd]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        if (carouselRef.current) {
            carouselRef.current.style.transitionDuration = '300ms';
        }
    };

    const nextSlide = () => {
        goToSlide(currentIndex + 1 > children.length ? currentIndex : currentIndex + 1);
    };

    const prevSlide = () => {
        goToSlide(currentIndex - 1 < -1 ? currentIndex : currentIndex - 1);
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto flex items-center justify-between py-4">
            <button
                title='Previous slide'
                className="p-2"
                onClick={prevSlide}
            >
                <ChevronLeftIcon className='size-8 text-gray-800 hover:text-gray-600 transition-colors duration-200'/>
            </button>
            <div
                className="overflow-hidden grow mx-4 relative"
            >
                <div
                    ref={carouselRef}
                    className="flex transition-transform ease-in-out"
                    style={{ transform: `translateX(${-((effectiveIndex - numVisible + 1) * 100) / numVisible}%)` }}
                >
                    {duplicatedElements.map((element, index) => (
                        <div
                            key={index}
                            className="shrink-0 p-x2"
                            style={{ width: `${100 / numVisible}%` }}
                        >
                            {element}
                        </div>
                    ))}
                </div>
            </div>
            <button
                title='Next slide'
                className="p-2"
                onClick={nextSlide}
            >
                <ChevronRightIcon className='size-8 text-gray-800 hover:text-gray-600 transition-colors duration-200'/>
            </button>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center mt-4">
                {children.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 rounded-full mx-1 cursor-pointer ${(index - currentIndex + children.length) % children.length === 0 ? 'bg-yellow-400' : 'bg-gray-300'}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
