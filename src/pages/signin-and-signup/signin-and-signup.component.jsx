import React from 'react'

import './signin-and-signup.styles.scss'
import SignIn from '../../components/sign-in/sign-in.component'
import SignUp from '../../components/sign-up/sign-up.component'

const SigninAndSignup = () => (
    <div className = "signin-and-signup">
        <SignIn />
        <SignUp />
    </div>
)

export default SigninAndSignup