import Head from 'next/head'
import Image from 'next/image'

import Main from "../components/Layout/Main";
import type { NextPage } from "next"

interface Props {

}


const Index: NextPage<Props> = ({ }) => {
	return (
		<Main>
			<div>Index</div>
		</Main>

	)
}

export default Index;