import React from "react";
import type { NextPage } from "next"
import { GoThreeBars } from 'react-icons/go'


interface Props {
    onClickOverlay: Function,
}

const Header: NextPage<Props> = ({ onClickOverlay }) => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    return (
        <div className={"mb-16"}>
            <nav className="top-0 fixed w-full flex items-center bg-white shadow h-16 ">
                <div className={"flex justify-between w-full"}>
                    <div className={"ml-2 flex items-center"}>
                        <div className={"flex justify-center items-center w-12 h-12"} onClick={() => onClickOverlay()}>
                            <GoThreeBars size={"2em"} />
                        </div>
                        <span className={"ml-2 text-3xl"}>Next App</span>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header