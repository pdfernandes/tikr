import React from "react";


class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            username: "",
            email: "",
            fname: "",
            lname: "",
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
            <main className='signup-form-container'>
                <form onSubmit={this.handleSubmit} className='signup-form'>
                    <div>
                        <h1>Make Your Money Move </h1>
                        <h2>Tikr lets you make pretend you're investing, commision free.</h2>
                    </div>
                    <div>
                        <label>
                            <input className='signup-input' type="text" value={this.state.fname} onChange={this.update("fname")} placeholder="First Name"/>
                        </label>
                        <label>
                            <input className='signup-input' type="text" value={this.state.lname} onChange={this.update("lname")} placeholder="Last Name" />
                        </label>
                        <label>
                            <input className='signup-input' type="text" value={this.state.email} onChange={this.update("email")} placeholder="Email address" />
                        </label>
                        <label>
                            <input className='signup-input' type="text" value={this.state.username} onChange={this.update("username")} placeholder="Username" />
                        </label>
                        <label>
                            <input className='signup-input' type="password" value={this.state.password} onChange={this.update("password")} placeholder="Password (min. 10 characters)" />
                        </label>
                        <input type="submit" value={this.props.formType} />
                    </div>
                </form>
            </main>
        )
    }

}

export default SignupForm;