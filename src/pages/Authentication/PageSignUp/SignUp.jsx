
function SignUp(){

    return(
            <div className="container-signup">
                <form action="">
                    <h1>Sign Up</h1>
                        <div className="input-box">
                            <p>Your email:</p>
                            <input type="text" placeholder="example@mail.com" required/>
                        </div>
                        <div className="input-box-name">
                          <div>
                            <p className="first-name">First Name:</p>
                            <input type="text" placeholder="" required/>
                          </div>
                          <div>
                            <p className="last-name">Last Name:</p>
                            <input type="text" placeholder="" required/>
                          </div>
                        </div>
                        <div className="input-box">
                            <p>Your password:</p>
                            <input type="text" placeholder="********" required/>
                        </div>
                        <div className="input-box">
                            <p>Confirm password:</p>
                            <input type="text" placeholder="*******" required/>
                        </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
    );
}
export default SignUp;