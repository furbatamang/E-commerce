import React from 'react';
import {ReactComponent as FacebookIcon} from '../assets/icons/facebook.svg';
import {ReactComponent as TwitterIcon} from '../assets/icons/twitter.svg';
import {ReactComponent as InstagramIcon} from '../assets/icons/instagram.svg';
import {ReactComponent as PinterestIcon} from '../assets/icons/pinterest.svg';
import {ReactComponent as LocationIcon} from '../assets/icons/location.svg';
import {ReactComponent as CallIcon} from '../assets/icons/phone.svg';
import {ReactComponent as MailIcon} from '../assets/icons/mail.svg';
import {ReactComponent as MasterCardIcon} from '../assets/icons/mastercard.svg';
import {ReactComponent as PayPalIcon} from '../assets/icons/paypal.svg';
import {ReactComponent as VisaCardIcon} from '../assets/icons/visacard.svg';
import {ReactComponent as KhaltiIcon} from '../assets/icons/khalti.svg';
const Footer = () => {
    return (
        <div className='flex justify-between p-4 gap-x-10'>
            <div className='flex-1 flex flex-col gap-y-4 px-4'>
                <h1 className='text-4xl font-bold'>DELIGHT</h1>
                <p>
                    There are many variations of passages of Lorem Ipsum available, but
                    the majority have suffered alteration in some form, by injected
                    humour, or randomised words which don't look even slightly believable.
                </p>
                <div className='flex gap-x-3 items-center'>
                    <FacebookIcon/>
                    <InstagramIcon/>
                    <TwitterIcon/>
                    <PinterestIcon/>
                </div>
            </div>
            <div className='flex-1 flex flex-col gap-y-4'>
                <h2 className='font-bold text-xl'>Useful Links</h2>
                <ul className='flex flex-wrap gap-y-4'>
                    <li  className='w-1/2'>Home</li>
                    <li  className='w-1/2'>Cart</li>
                    <li  className='w-1/2'>Man Fashion</li>
                    <li  className='w-1/2'>Woman Fashion</li>
                    <li  className='w-1/2'>Accessories</li>
                    <li  className='w-1/2'>My Account</li>
                    <li  className='w-1/2'>Order Tracking</li>
                    <li  className='w-1/2'>Wishlist</li>
                    <li  className='w-1/2'>Terms</li>
                </ul>
            </div>
            <div className='flex-1 gap-y-4 flex flex-col'>
                <h2 className='font-bold text-xl'>Contact</h2>

                <div className='flex flex-col gap-y-5'>
                    <div className='flex gap-x-2'>
                        <LocationIcon />
                        <p>Bharatpur-10, Chitwan</p>
                    </div>
                    <div className='flex gap-x-2'>
                        <CallIcon />
                        <p>+977 9817544754</p>
                    </div>
                    <div className='flex gap-x-2'>
                        <MailIcon/>
                        <p>delight@gmail.com</p>
                    </div>
                    <div className='flex gap-x-4'>
                        <MasterCardIcon/>
                        <PayPalIcon/>
                        <VisaCardIcon/>
                        <KhaltiIcon/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
