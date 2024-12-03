import ColorGenerator from "./components/v0-collor-generator"

export const CollorGeneratorPage = () => {
    return (
        <section className='flex gap-7 flex-col'>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                Collor Generator
            </h1>
        <ColorGenerator/>
        </section>
    )
}
