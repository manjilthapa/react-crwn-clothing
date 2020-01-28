import React from 'react'
import './sign-up.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'


class SignUp extends React.Component{
    constructor(){
        super()
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword : ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault()

        const {displayName, email, password, confirmPassword} = this.state

        if(password !== confirmPassword){
            alert("Password does not match")
            return
        }

        try{
            const {user} = await auth.createUserWithEmailAndPassword(email, password)

            await createUserProfileDocument(user, {displayName})
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword : ''
            })
 
        }catch(error){
            console.log("ERROR ", error)
        }
    }

    handleChange = event =>{
        const {name, value} = event.target
        this.setState({[name]: value})
    }

    render(){
        const {displayName, email, password, confirmPassword} = this.state
        return (
            <div className="sign-up">
                <h2 className="title">I don't have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type = "text"
                        name = "displayName"
                        value = {displayName}
                        label = "Display name"
                        onChange = {this.handleChange}
                        required
                    />
                    <FormInput
                        type = "email"
                        name = "email"
                        value = {email}
                        label = "Email"
                        onChange = {this.handleChange}
                        required
                    />
                    <FormInput
                        type = "password"
                        name = "password"
                        value = {password}
                        label = "Password"
                        onChange = {this.handleChange}
                        required
                    />
                    <FormInput
                        type = "password"
                        name = "confirmPassword"
                        value = {confirmPassword}
                        label = "Confirm password"
                        onChange = {this.handleChange}
                        required
                    />
                    <CustomButton type="submit">Sign up</CustomButton>
                </form>

            </div>
        )
    }
}

export default SignUp