import React, { useState ,useEffect} from "react";
import { BsChevronCompactLeft, BsChevronCompactRight,BsPauseCircle } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import Navbar from "./Navbar";
function Newhome() {
  const slides = [
    {
      url: "./home/ngo1.jpeg",
    },
    {
      url: "./home/ngo2.jpeg",
    },
    {
      url: "./home/ngo3.jpeg",
    },

    {
      url: "./home/ngo4.jpeg",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true); // State to control autoplay
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isAutoplay) {
        nextSlide();
      }
    }, 3000); // Change image every 3 seconds (adjust as needed)
  
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [isAutoplay, nextSlide]); // Dependencies to ensure effect runs only when needed
  return (
    <>
      <Navbar />
      <div className="max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group">
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactLeft onClick={prevSlide} size={30} />
        </div>
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
          <BsChevronCompactRight onClick={nextSlide} size={30} />
        </div>
        <div className="flex top-4 justify-center py-2">
          {slides.map((slide, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className="text-2xl cursor-pointer"
            >
             
            </div>
          ))}
        </div>
          {/* Pause Button (New) */}
          <button className="absolute top-5 right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer invisible group-hover:visible" onClick={() => setIsAutoplay(!isAutoplay)}>
  {isAutoplay ? '' : ''}
  <BsPauseCircle size={30} />
</button>

  <div className="flex top-4 justify-center py-2">
    {slides.map((slide, slideIndex) => (
      <div
        key={slideIndex}
        onClick={() => goToSlide(slideIndex)}
        className="text-2xl cursor-pointer"
      >
        <RxDotFilled />
      </div>
    ))}</div>
      </div>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Volunteer Opportunities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* You can map through your volunteer opportunities data here and display them */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="./home/ccd.jpeg"
                alt="Volunteer Opportunity"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Community Care Day
                </h3>
                <p className="text-gray-700">
                  Join us for our upcoming Community Care Day event, where
                  volunteers like you will come together to support local NGOs
                  in their efforts to improve the lives of those in need.
                </p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Learn More
                </button>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="./home/women.jpeg"
                alt="Volunteer Opportunity"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Women's Empowerment Symposium
                </h3>
                <p className="text-gray-700">
                  Together, we can break down barriers, challenge stereotypes,
                  and create a world where every woman has the opportunity to
                  thrive.
                </p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Learn More
                </button>
              </div>
            </div>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src="./home/youth.jpeg"
                alt="Volunteer Opportunity"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Youth Leadership Camp
                </h3>
                <p className="text-gray-700">
                  Whether it's through mentoring one-on-one, leading group
                  discussions, or facilitating team challenges, your
                  contributions will make a lasting impact on the lives of our
                  future leaders.
                </p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Learn More
                </button>
              </div>
            </div>

            {/* Repeat this block for each volunteer opportunity */}
          </div>
        </div>
      </section>
    </>
  );
}

export default Newhome;
