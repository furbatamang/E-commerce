import React,{useState} from 'react';
import {ReactComponent as LeftIcon} from '../assets/icons/arrow_left.svg';
import {ReactComponent as RightIcon} from '../assets/icons/arrow_right.svg';
import { sliderItems } from '../data';
import styled from 'styled-components';
import '../assets/css/Slider.css';


const Wrapper = styled.div`
    height:100%;
    display:flex;
    align-items:center;
    transform:translateX(${(props) => props.slideIndex * -100}vw);
    transition: all 1s ease;
    padding:1.25rem;
`
const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0)
    const handleClick = (direction) => {
        console.log(direction)
        if(direction === 'left'){
            setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2)
        }else{
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
        }
    }

    return (
        <div className='relative w-full h-screen flex overflow-hidden'>
            <div className='px-4 py-3 rounded-full bg-pink-200 inline-block cursor-pointer absolute left-0 top-72 z-10' onClick={() => handleClick('left')}>
                <LeftIcon/>
            </div>
            <Wrapper slideIndex={slideIndex}>
                {
                    sliderItems.map(item => (
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
                    ))
                }
            </Wrapper>
            <div className='px-4 py-3 rounded-full bg-pink-200 inline-block cursor-pointer absolute right-0 top-72 z-10' onClick={() => handleClick('right')}>
                <RightIcon />
            </div>
        </div>
    )
}

export default Slider
