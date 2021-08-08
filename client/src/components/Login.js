import React, {Fragment} from 'react';

const Login = ({setAuth}) => {
    return (
        <Fragment>
            <h1>Login</h1>
            <button onClick={()=>{
                console.log('test')
                setAuth(true)
                console.log()
                }}>authenticate</button>
        </Fragment>
    )
}
export default Login;