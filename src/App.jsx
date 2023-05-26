import { Fragment, lazy, Suspense } from "react";
import "./App.css";
import "swiper/scss";
import { Routes, Route } from "react-router-dom";
import MainMovie from "./components/layout/MainMovie";
import Banner from "./components/banner/Banner";
import Loading from "./components/loading/Loading";
// import NotFound from "./pages/NotFound";
const NotFound = lazy(() => import("./pages/NotFound"));
// import HomePage from "./pages/HomePage";
const HomePage = lazy(() => import("./pages/HomePage"));
// import MoviePage from "./pages/MoviePage";
// const MoviePage = lazy(() => import("./pages/MoviePage"));
const MoviePage2 = lazy(() => import("./pages/MoviePage2"));
// import MovieDetailsPage from "./pages/MovieDetailsPage";
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage"));

const App = () => {
    return (
        <Fragment>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route element={<MainMovie />}>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Banner />
                                    <HomePage />
                                </>
                            }
                        ></Route>
                        <Route path="/movies" element={<MoviePage2 />}></Route>
                        <Route path="/movie/:movieId" element={<MovieDetailsPage />}></Route>
                        <Route path="*" element={<NotFound />}></Route>
                    </Route>
                </Routes>
            </Suspense>
        </Fragment>
    );
};

export default App;
