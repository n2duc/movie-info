import React, { Fragment } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const MainMovie = () => {
    return (
        <Fragment>
            <Header></Header>
            <Outlet />
        </Fragment>
    )
}

export default MainMovie