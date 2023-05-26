import React, { Fragment } from 'react';
import MoiveList from '../components/movies/MoiveList';

const HomePage = () => {
    return (
        <Fragment>
            <section className="movies-layout page-container pb-10">
                <h2 className="capitalize text-white mb-5 text-2xl font-bold">
                    Now playing
                </h2>
                <MoiveList type='now_playing'></MoiveList>
            </section>
            <section className="movies-layout page-container pb-10">
                <h2 className="capitalize text-white mb-5 text-2xl font-bold">
                    Top rated movies
                </h2>
                <MoiveList type="top_rated"></MoiveList>
            </section>
            <section className="movies-layout page-container pb-10">
                <h2 className="capitalize text-white mb-5 text-2xl font-bold">
                    Trending
                </h2>
                <MoiveList type="popular"></MoiveList>
            </section>
        </Fragment>
    )
}

export default HomePage