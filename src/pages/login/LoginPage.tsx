import LoginForm from "../../components/forms/login/LoginForm"
import { useState } from "react"
import ChangePasswordForm from "../../components/forms/changePassword/ChangePasswordForm"

const LoginPage = ({setEmail}: any) => {

    const [user, setUser] = useState()

    return (
        user ? <ChangePasswordForm user={user}/> : <LoginForm setEmail={setEmail} setUser={setUser}/>
        
    )
}

export default LoginPage