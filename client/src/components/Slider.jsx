import React,{useState} from 'react';
import { sliderItems } from '../data';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
const Slider = () => {

    return (
        <>
            <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            loop={true}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            >
                {
                    sliderItems.map(item => (
                        <SwiperSlide>
                            <div className='w-screen h-screen flex items-center' key={item.id}>
                                <div className='h-full flex-1 p-9'>
                                    <img src={item.img} alt=""  className='h-5/6'/>
                                </div>
                                <div className='flex-1 flex gap-y-14 flex-col items-start p-10'>
                                    <h1 className='text-6xl font-bold'>{item.title}</h1>
                                    <p className='text-xl tracking-wider'>{item.desc}</p>
                                    <button className='border-2 border-black p-3 bg-transparent drop-shadow-md'>SHOW NOW</button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
                {/* <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide> */}
      
            </Swiper>
        </>
    )
}

export default Slider
