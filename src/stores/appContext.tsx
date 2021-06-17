import { createContext, useEffect } from "react";
import { useState } from "react";
import type { NextPage } from "next"


interface Props {

}


const AppContext = createContext({
    notif: {
        success: (msg: string) => { },
        error: (msg: string) => { },
        info: (msg: string) => { },
        warning: (msg: string) => { },
    }
})

export const AppContextProvider: NextPage<Props> = ({ children }) => {
    const [showNotif, setShowNotif] = useState({
        show: false,
        title: "",
        msg: "",
        className: ""
    });

    const notif = {
        error: (msg: string) => {
            setShowNotif({
                show: true,
                title: "Error",
                msg: msg,
                className: "bg-red-600"
            });
        },
        info: (msg: string) => {
            setShowNotif({
                show: true,
                title: "Info",
                msg: msg,
                className: "bg-blue-600"
            });
        },
        success: (msg: string) => {
            setShowNotif({
                show: true,
                title: "Success",
                msg: msg,
                className: "bg-green-600"
            });
        },
        warning: (msg: string) => {
            setShowNotif({
                show: true,
                title: "Warning",
                msg: msg,
                className: "bg-yellow-600"
            });
        },
    }

    useEffect(() => {
        if (showNotif.show) {
            setTimeout(() => {
                setShowNotif({ ...showNotif, show: false });
            }, 3000)
        }
    }, [showNotif])

    const context = {
        notif,
    }

    return (
        <AppContext.Provider value={context}>
            <div className={`fixed w-full transition duration-1000 transform -mt-20 top-0 z-50 ${showNotif.show && ' translate-y-32'}`}>
                <div className={"px-4 w-full flex justify-center"}>
                    <div className={`flex flex-col w-full max-w-2xl py-2 px-4 rounded-lg text-gray-100 ${showNotif.className}`}>
                        <div className={"font-bold"}>{showNotif.title}</div>
                        <div>{showNotif.msg}</div>
                    </div>
                </div>
            </div>
            {children}
        </AppContext.Provider>
    )

}

export default AppContext