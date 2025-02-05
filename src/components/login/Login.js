import React, {useState} from 'react';

// function Alert(props) {
//     return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

//TODO:Hide Signed in Nav on login page

function Login(){
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) =>{
        const {id, value} = e.target;
        setState(prevState => {
            return {
                ...prevState,
                [id]: value,
            }});
    };

    //TODO: Add authentication upon button click
    const handleSubmit = (e) => {
        if (state.email === "" || state.password === "") {
            // setError("Fields are required");
            alert("Fields are required");
        }
        else{
            e.preventDefault();
            window.location.href='/';
        }

    };

    return (
        <section className="hero is-primary is-fullheight">
            <h1 className="title center">Team Vision</h1>
            <div className="hero-body">
                
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-5-tablet is-4-desktop is-3-widescreen">
                            <form action="" className="box">
                                <div className="field">
                                    <label htmlFor="" className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input type="email"
                                               placeholder="Enter email"
                                               className="input"
                                               required
                                               id="email"
                                               value = {state.email}
                                                onChange={handleChange}
                                        />
                                            <span className="icon is-small is-left">
                                              <i className="fa fa-envelope"/>
                                            </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="" className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input type="password"
                                               placeholder="Password"
                                               className="input"
                                               required
                                               id="password"
                                               onChange={handleChange}
                                               value={state.password}
                                        />
                                            <span className="icon is-small is-left">
                                              <i className="fa fa-lock"/>
                                            </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label htmlFor="" className="checkbox">
                                        <input type="checkbox"/>
                                            &nbsp; Remember me
                                    </label>
                                </div>
                                <div className="field">
                                    <button className="button is-success" onClick={handleSubmit}>
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/*{error && (*/}
            {/*    <Alert severity="error" onClick={() => setError(null)}>*/}
            {/*        {props.error || error}*/}
            {/*    </Alert>*/}
            {/*)}*/}
        </section>
    );
};

export default Login;