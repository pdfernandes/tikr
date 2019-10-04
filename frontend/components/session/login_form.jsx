import React from "react";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            username: "",
            password: ""
        }

        this.demoLogin = this.demoLogin.bind(this)
    }
    componentWillUnmount() {

    }
    handleSubmit(e) {
        e.preventDefault()
        this.props.processForm(this.state)
    }

    demoLogin(e) {
        e.preventDefault()
        this.props.processForm({
            username: 'DemoUser',
            password: 'password123'
        })
    }

    update(field) {
        return (e) => (
            this.setState({ [field]: e.target.value })
        )

    }

    render() {
        let errors;
        if (this.props.errors.length !== 0) {
            errors = (
                <h3 class='login-errors'><i class="fas fa-exclamation"></i>  {this.props.errors}</h3>
            )
        } else {
            errors = null
        }
     
        return (
         
                <div className='login-page'>
                    <div className='login-img-container'>
                    </div>
                    <main className='login-form-container'>
                    <form onSubmit={this.handleSubmit} className='login-form'>
                        
                        <h1 className='login-heading'>Welcome to Tikr</h1>

                        <label className='login-label'>
                            <div className='label-text'>Username</div>
                            <input className='input' type="text" value={this.state.username} onChange={this.update("username")} required />
                        </label>      
                        <label className='login-label'>
                            <div className='label-text'>Password</div>
                            <input className="input"type="password" value={this.state.password} onChange={this.update("password")} required />
                        </label>    
                        {errors} 
                        <div className='login-buttons'>
                            <input className="login-button" type="submit" value="Sign In"/>
                            <input className="login-button" type="submit" value=" Demo " onClick={this.demoLogin}/>
                        </div> 
                    </form>
                    </main>
                </div>
         
        )
    }

}

export default LoginForm;