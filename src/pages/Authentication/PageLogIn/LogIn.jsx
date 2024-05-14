
function LogIn(){


    return(
            <div className="container-login">
                <form action="">
                    <h1>Log In</h1>
                        <div className="input-box">
                            <p>Please enter your email:</p>
                            <input type="text" placeholder="example@mail.com" required/>
                        </div>
                        <div className="input-box">
                            <p>Please enter your password:</p>
                            <input type="text" placeholder="********" required/>
                        </div>
                        <div className="forgot-password">Forgot password</div>
                    <button type="submit">Log In</button>
                </form>
            </div>
    );
}
export default LogIn;