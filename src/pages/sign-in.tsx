
import { useContext } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import AppContext from "../stores/appContext"
import * as Yup from 'yup';
import { Form, Formik, FormikValues } from 'formik';
import { useMutation } from 'react-query'
import TextField from "../components/formik/TextField";
import ButtonSubmit from "../components/formik/ButtonSubmit";
import type { NextPage } from "next"
import { Api } from '../lib/Api';
import Router from "next/router"
import Cookie from "js-cookie"

interface Props {

}

let schema = Yup.object().shape({
	email: Yup.string().email().required(),
	password: Yup.string().required(),
});

const Signin: NextPage<Props> = ({ }) => {
	const { notif } = useContext(AppContext)

	const initFormikValue = {
		email: 'jihanlugas2@gmail.com',
		password: '123456',
	}

	const { data, mutate, error, isLoading } = useMutation((val: FormikValues) => Api.post('/devapi/signin', val))

	const handleSubmit = (values: FormikValues) => {
		mutate(values, {
			onSuccess: (res) => {
				if (res.success) {
					Router.push("/search")
				} else if (res.error) {
					notif.error(res.message)
				}
			}
		})
	}

	return (
		<div className={"h-screen w-screen bg-gray-200 flex justify-center items-center"}>
			<div className={"px-4 w-full max-w-md"}>
				<div className={"w-full bg-white rounded-lg shadow p-4"}>
					<Formik
						initialValues={initFormikValue}
						validationSchema={schema}
						enableReinitialize={true}
						onSubmit={handleSubmit}
					>
						{() => {
							return (
								<Form>
									<div className={"flex justify-center"}>
										<span className={"text-xl font-bold"}>Sign In</span>
									</div>
									<div className={""}>
										<div className="mb-4">
											<TextField
												label={"Email"}
												name={"email"}
												type={"email"}
												placeholder={"Email"}
											/>
										</div>
										<div className="mb-4">
											<TextField
												label={"Password"}
												type={"password"}
												name={"password"}
												placeholder={"Password"}
											/>
										</div>
										<div className={""}>
											<ButtonSubmit
												label={'Sign In'}
												disabled={isLoading}
												loading={isLoading}
											/>
										</div>
									</div>

								</Form>
							)
						}}
					</Formik>

				</div>
			</div>
		</div>

	)
}

export default Signin;