import React from "react";
import Image from 'next/image'
import Link from "next/link";
import ToggleButton from './toggleButton'

function Header() {
    return (
        <header className="bg-gray-900 text-white h-20 absolute top-0 w-[100%] flex justify-between items-center">
            <Link className="ml-4" href={'/'}>
                <p className="text-2xl font-bold">Rockout</p>
            </Link>
            <div className="flex items-center mr-4">
                <ToggleButton />
                <a href="https://twitter.com/pushkaraj2007" className="text-gray-400 hover:text-white mr-4">
                    <Image height={30} width={30} src={'/twitter.png'} />
                </a>
                <a href="https://github.com/example" className="text-gray-400 hover:text-white">
                    <Image height={40} width={40} src={'/github.png'} />
                </a>
            </div>
        </header>
    )
}

export default Header
