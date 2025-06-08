import { useEffect, useRef, useState } from 'react';

export function CardCarousel({ cardsList, onCardClick }) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const carouselRef = useRef();

  const [cardsVisible, setCardsVisible] = useState(4);
  const CARD_WIDTH = 330;
  const cards = cardsList;

  useEffect(() => {
    const updateCardsVisible = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCardsVisible(4);
      else if (width >= 768) setCardsVisible(3);
      else setCardsVisible(1);
    };

    updateCardsVisible();
    window.addEventListener('resize', updateCardsVisible);
    return () => window.removeEventListener('resize', updateCardsVisible);
  }, []);

  const maxIndex = Math.max(0, cards.length - cardsVisible);

  const slideLeft = () => {
    setCarouselIndex((prev) => Math.max(prev - 1, 0));
  };

  const slideRight = () => {
    setCarouselIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselIndex * CARD_WIDTH,
        behavior: 'smooth',
      });
    }
  }, [carouselIndex]);

  return (
    <div className="relative mb-6">
      <button
        onClick={slideLeft}
        disabled={carouselIndex === 0}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 px-3 py-2 rounded-full flex text-center disabled:opacity-50 z-10 hover:cursor-pointer"
        aria-label="Slide Left"
      >
        <i className="fas fa-chevron-left text-gray-800 text-xs items-center"></i>
      </button>

      {/* Card Container */}
      <div ref={carouselRef} className="flex overflow-x-hidden scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
        {cards.map((card, index) => (
          <div key={index} className="flex-shrink-0 bg-blue-600 h-32 rounded-md shadow mr-4 w-64 hover:cursor-pointer" onClick={() => onCardClick(index)}>
            <div className="p-3">
              <p className="md:text-lg lg:text-xl text-md">{card.title}</p>
              <p className="md:text-md text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={slideRight}
        disabled={carouselIndex === maxIndex}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 px-3 py-2 rounded-full flex text-center disabled:opacity-50 z-10 hover:cursor-pointer"
        aria-label="Slide Right"
      >
        <i className="fas fa-chevron-right text-gray-800 text-xs items-center"></i>
      </button>
    </div>
  );
}
