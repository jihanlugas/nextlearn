import { useState, useEffect, useContext } from "react"
import Main from "../../components/Layout/Main"
import Head from "next/head"
import { useMutation, useQuery } from "react-query";
import { Api } from "../../lib/Api";
import { useDebounce } from "../../utils/Hooks"
import { isEmptyObject } from "../../utils/Validate"
import AppContext from "../../stores/appContext"



interface Ikanji {
    kanji?: string,
    grade?: number,
    stroke_count?: number,
    meanings?: string[],
    kun_readings?: string[],
    on_readings?: string[],
    name_readings?: string[],
    jlpt?: number | null,
    unicode?: string,
}

interface Ireading {
    reading?: string,
    main_kanji?: string[],
    name_kanji?: string[],
}

interface Iword {
    variants: any,
    meanings: any,
}

interface Iwords extends Array<Iword> { }


interface Idata {
    kanji: Ikanji,
    reading: Ireading,
    words: Iwords,
}

const initFormikValue = {
    search: ""
}

const Search = () => {
    const { notif } = useContext(AppContext)

    const [data, setData] = useState<Idata>({
        kanji: {},
        reading: {},
        words: [],
    })

    const [search, setSearch] = useState<string>("")
    const debounceSearch = useDebounce(search, 500)

    const [kanji, setKanji] = useState<Ikanji>({})
    const [reading, setReading] = useState<Ireading>({})
    const [words, setWords] = useState<Iwords>([])
    const [limitWords, setLimitWords] = useState<number>(10)

    const { data: dataKanji, mutate: mutateKanji } = useMutation((val: string) => Api.get(`/kanji/${val}`))
    const { data: dataReading, mutate: mutateReading } = useMutation((val: string) => Api.get(`/reading/${val}`))
    const { data: dataWords, mutate: mutateWords } = useMutation((val: string) => Api.get(`/words/${val}`))

    useEffect(() => {
        if (dataKanji && !dataKanji.error) {
            setKanji(dataKanji)
        } else {
            setKanji({})
        }
    }, [dataKanji])

    useEffect(() => {
        if (dataReading && !dataReading.error) {
            setReading(dataReading)
        } else {
            setReading({})
        }
    }, [dataReading])

    useEffect(() => {
        if (dataWords && !dataWords.error) {
            setWords(dataWords)
        } else {
            setWords([])
        }
    }, [dataWords])

    useEffect(() => {
        setLimitWords(10)
        if (search === "") {
            setKanji({})
            setReading({})
            setWords([])
        } else {
            mutateKanji(search)
            mutateReading(search)
            mutateWords(search)
        }
    }, [debounceSearch])

    return (
        <Main>
            <Head>
                <title>Search Kanji</title>
            </Head>
            <div className={"p-4 font-sans"}>
                <div className={"mb-4"}>
                    <div className={"text-2xl"} onClick={() => notif.success("Tes")} >Search Kanji</div>
                </div>
                <div className={""}>
                    <div className={"flex flex-col w-full mb-8"}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className={"w-full border-2 rounded h-10 px-2 bg-gray-50"}
                            placeholder={"Search ..."}
                        />
                        <div className={"text-sm mt-1 mb-2 flex flex-row"}>
                            <div>Example</div>
                            <div className={"ml-2 text-blue-600 underline"} onClick={() => setSearch("愛")} >Kanji : 愛</div>
                            <div className={"ml-2 text-blue-600 underline"} onClick={() => setSearch("あい")} >Kana : あい</div>
                        </div>
                    </div>
                    {!isEmptyObject(kanji) && (
                        <div className={"mb-8"}>
                            <div className={"flex mb-4"}>
                                <div className={"h-24 w-24 mr-4"}>
                                    <div className={"bg-gray-50 rounded-lg flex justify-center items-center w-full h-full"}>
                                        <div className={"text-6xl font-kanji"}>{kanji.kanji}</div>
                                    </div>
                                </div>
                                <div className={"grid grid-cols-3 flex-grow"}>
                                    <div className={"flex flex-col items-center justify-center"}>
                                        <div className={"text-xl font-bold text-blue-800"}>{kanji.grade}</div>
                                        <div className={""}>Grades</div>
                                    </div>
                                    <div className={"flex flex-col items-center justify-center"}>
                                        <div className={"text-xl font-bold text-blue-800"}>{kanji.jlpt ? kanji.jlpt : '-'}</div>
                                        <div className={""}>JLPT</div>
                                    </div>
                                    <div className={"flex flex-col items-center justify-center"}>
                                        <div className={"text-xl font-bold text-blue-800"}>{kanji.stroke_count}</div>
                                        <div className={""}>Stroke</div>
                                    </div>
                                </div>
                            </div>
                            {kanji.meanings.length > 0 && (
                                <div className={"flex flex-wrap mb-4"}>
                                    {kanji.meanings.map((meaning, key) => {
                                        return (
                                            <div className={"mr-4 mb-2"} key={key}>{meaning}</div>
                                        )
                                    })}
                                </div>

                            )}
                            {kanji.on_readings.length > 0 && (
                                <div className={"flex flex-wrap mb-4"}>
                                    <div className={"flex w-full mb-2"}>
                                        <div>On Reading</div>
                                    </div>
                                    {kanji.on_readings.map((on, key) => {
                                        const onread = on.split(".")
                                        return (
                                            <div className={"mr-4 mb-2 px-2 py-1 bg-green-400 rounded flex"} key={key}>
                                                <div className={"text-gray-100"}>{onread[0]}</div>
                                                <div className={"text-gray-300"}>{onread[1]}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            {kanji.kun_readings.length > 0 && (
                                <div className={"flex flex-wrap mb-4"}>
                                    <div className={"flex w-full mb-2"}>
                                        <div>Kun Reading</div>
                                    </div>
                                    {kanji.kun_readings.map((kun, key) => {
                                        const kunread = kun.split(".")
                                        return (
                                            <div className={"mr-4 mb-2 px-2 py-1 bg-blue-400 rounded flex"} key={key}>
                                                <div className={"text-gray-100"}>{kunread[0]}</div>
                                                <div className={"text-gray-300"}>{kunread[1]}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                            {kanji.name_readings.length > 0 && (
                                <div className={"flex flex-wrap mb-4"}>
                                    <div className={"flex w-full mb-2"}>
                                        <div>Name Reading</div>
                                    </div>
                                    {kanji.name_readings.map((name, key) => {
                                        return (
                                            <div className={"mr-4 mb-2 px-2 py-1 bg-gray-700 text-gray-200 rounded"} key={key}>{name}</div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    )}
                    {!isEmptyObject(reading) && (
                        <div className={"mb-8"}>
                            <div className={"text-3xl font-kanji mb-4 font-bold"}>{reading.reading}</div>
                            {reading.main_kanji.length > 0 && (
                                <div className={"flex flex-wrap mb-4"}>
                                    <div className={"flex w-full mb-2"}>
                                        <div>Main Kanji</div>
                                    </div>
                                    {reading.main_kanji.map((main, key) => {
                                        return (
                                            <div className={"mr-4 mb-2 px-2 py-1 bg-gray-700 text-gray-200 rounded font-bold"} key={key}>{main}</div>
                                        )
                                    })}
                                </div>

                            )}
                            {reading.name_kanji.length > 0 && (
                                <div className={"flex flex-wrap mb-4"}>
                                    <div className={"flex w-full mb-2"}>
                                        <div>Name Reading</div>
                                    </div>
                                    {reading.name_kanji.map((name, key) => {
                                        return (
                                            <div className={"mr-4 mb-2 px-2 py-1 bg-gray-700 text-gray-200 rounded font-bold"} key={key}>{name}</div>
                                        )
                                    })}
                                </div>

                            )}
                        </div>
                    )}
                    {words.length > 0 && (
                        <div className={"mb-8"}>
                            <div className={"text-2xl font-bold"}>Words</div>
                            {words.map((word, key) => {
                                if (key < limitWords) {
                                    return (
                                        <div className={"mb-2 bg-gray-100 p-2 rounded"} key={key}>
                                            {word.variants.length > 0 && (
                                                <div className={"mb-2"}>
                                                    {word.variants.map((variant, key) => {
                                                        return (
                                                            <div key={key} className={"bg-gray-700 text-gray-200 p-2 rounded-lg mb-2"}>
                                                                <div className={"text-sm"}>{variant.pronounced}</div>
                                                                <div className={"text-2xl"}>{variant.written}</div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                            {word.meanings.length > 0 && (
                                                <div className={"mb-2"}>
                                                    {word.meanings.map((meaning, key) => {
                                                        return (
                                                            <div key={key}>
                                                                {meaning.glosses.length > 0 && (
                                                                    <div className={"mb-1"}>
                                                                        {meaning.glosses.map((gloss, key) => {
                                                                            return (
                                                                                <div key={key}>{(key + 1) + ". " + gloss}</div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )
                                } else if (key === limitWords) {
                                    return (
                                        <div key={key} className={"flex justify-center items-center"}>
                                            <div className={"shadow px-4 py-2 rounded-full bg-gray-300"} onClick={() => setLimitWords(limitWords + 10)}>
                                                Load More
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return null
                                }
                            })}
                        </div>
                    )}
                </div>
            </div>
        </Main>
    )
}

export default Search;