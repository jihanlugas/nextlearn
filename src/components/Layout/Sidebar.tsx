import { Fragment, useContext, useEffect, useState } from "react"
import type { NextPage } from "next"
import Link from "next/link"
import { GoThreeBars } from 'react-icons/go'

type Props = {
    onClickOverlay: Function,
    show: boolean,
};

const initAuth = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/search",
        name: "Search",
    },
]


const Sidebar: NextPage<Props> = ({ children, onClickOverlay, show }) => {
    const [authMenu, setAuthMenu] = useState(initAuth)

    return (
        <div className={show ? "z-10 inset-0 overflow-y-auto fixed" : "hidden"} >
            <div className="min-h-screen text-center p-0">
                <div className="fixed inset-0 transition-opacity" onClick={() => onClickOverlay()} aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div className="fixed bg-white h-screen flex w-80">
                    <div className={'flex bg-white flex-col w-full'}>
                        <div className="h-16 flex justify-center items-center fixed w-80 shadow">
                            <span className="text-3xl">Next App</span>
                        </div>
                        <div className="mt-16 h-screen overflow-y-scroll">
                            {authMenu.map((menu, index) => {
                                return (
                                    <Link href={menu.path} key={index}>
                                        <a>
                                            <div className="p-4 hover:bg-gray-200 w-full flex items-center">
                                                <div className="flex justify-center items-center h-4 w-4 mr-2">
                                                    <GoThreeBars size={"2em"} />
                                                </div>
                                                <div>
                                                    <span>{menu.name}</span>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar