
import { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import AppContext from "../stores/appContext"

import type { NextPage } from "next"

interface Props {

}

const Signin: NextPage<Props> = ({ }) => {
	const { notif } = useContext(AppContext)

	return (
		<div className={"h-screen w-screen bg-gray-200 flex justify-center items-center"}>
			<div className={"px-4 w-full max-w-md"}>
				<div className={"w-full bg-white rounded shadow p-4"} onClick={() => notif.success("Tes")}>
					<div className={"flex justify-center"}>
						<span className={"text-xl font-bold"}>Sign In</span>
					</div>
					<div className={""}>
						<div>Email</div>
						<div>Password</div>
						<div>Login</div>
					</div>
				</div>
			</div>
		</div>

	)
}

export default Signin;