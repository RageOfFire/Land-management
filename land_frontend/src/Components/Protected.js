import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
function Protected(props) {
    let Cmp = props.Cmp
    const navigate=useNavigate()
    useEffect(() => {
        if(!sessionStorage.getItem('token'))
        {
            navigate('/')
        }
    }, [])
    return(
        <div>
            <Cmp />
        </div>
    )
}

export default Protected