import Feed from "@components/Feed"
const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Explore and Innovate
                <br className="max-md:hidden" />
                <span className="blue_gradient">AI-Enhanced Ideas</span>
            </h1>

            <p className="desc text-center">
                EchoWords is a creative blog dedicated to discovering and sharing AI-generated content, ideas,
                and insights. Dive into a world where technology meets imagination, sparking inspiration
                with every word.
            </p>

            <Feed />
        </section>
    )
}

export default Home