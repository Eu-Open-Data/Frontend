
function PasswordReset(){

    return(
            <div className="container-reset">
                <form action="">
                    <h1>Password Reset</h1>
                        <div className="input-box">
                            <p>Please enter the new password:</p>
                            <input type="text" placeholder="********" required/>
                        </div>
                        <div className="input-box">
                            <p>Confirm password:</p>
                            <input type="text" placeholder="********" required/>
                        </div>
                    <button type="submit">Reset</button>
                </form>
            </div>
    );
}
export default PasswordReset;