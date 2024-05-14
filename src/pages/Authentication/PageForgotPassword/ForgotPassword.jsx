

function ForgotPassword(){


    return(
            <div className="container-forgot">
                <form action="">
                    <h1>Password Reset</h1>
                        <div className="input-box">
                            <p>Please enter your email:</p>
                            <input type="text" placeholder="example@mail.com" required/>
                        </div>
                       
                    <button type="submit">Submit</button>
                    <div className="message">We will send you an email with a password reset form.</div>
                </form>
            </div>
    );
}
export default ForgotPassword;