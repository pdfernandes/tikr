import React from "react";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            username: "",
            password: ""
        }
    }


    handleSubmit(e) {
        e.preventDefault()
        this.props.processForm(this.state)
    }

    update(field) {
        return (e) => (
            this.setState({ [field]: e.target.value })
        )

    }

    render() {

     
        return (
         
                <div className='login-page'>
                    <div className='login-img-container'>
                        <img className='login-img' src={window.login_page_image} alt="looks like some cells"/>
                    </div>
                    <main className='login-form-container'>
                    <form onSubmit={this.handleSubmit} className='login-form'>
                        <h1 className='login-heading'>Welcome to Tikr</h1>

                        <label className='login-label'>
                            <div className='label-text'>Username</div>
                            <input className='input' type="text" value={this.state.username} onChange={this.update("username")}/>
                        </label>      
                        <label className='login-label'>
                            <div className='label-text'>Password</div>
                            <input className="input"type="password" value={this.state.password} onChange={this.update("password")}/>
                        </label>      
                        <input className="login-button" type="submit" value="Sign In"/>
                    </form>
                    </main>
                </div>
         
        )
    }

}

export default LoginForm;