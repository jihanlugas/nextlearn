import React from "react";
import type { NextPage } from "next"

interface Props {

}

const IndexNavbar: NextPage<Props> = ({ }) => {
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    return (
        <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                    <div>Navbar</div>
                </div>
            </div>
        </nav>
    )
}

export default IndexNavbar