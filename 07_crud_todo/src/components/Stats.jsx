
import React from 'react'

const Stats = ({ totalTask, completedTask, pendingTask }) => {
    return (

        <>

            <h1>TotalTask:{totalTask}</h1>
            <h1>completedTask:{completedTask}</h1>
            <h1>pendingTask:{pendingTask}</h1>
        </>
    )
}

export default Stats