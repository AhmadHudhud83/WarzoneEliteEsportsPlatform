import { Link } from "react-router-dom";
import "./signup.css";
const SignUp = () => {
    return (
        <div className="container-fluid text-center" id="Signup">
            <div className="row" id="Sign-up">
                <nav className="col-lg-8" id="Sign-up-photo">
                    <img
                        className="signup-img"
                        src={require("../../assets/images/loginsignup/warzone.png")}

                    />

                </nav>
                <nav className="col-lg-4" id="Sign-up-form">
                    <img
                        className="signup-warzone"

                        src={require('../../assets/images/loginsignup/war.png')}
                        alt="warzone logo"
                    />
                    <p className="h4" id="sign-up">
                        Create an account
                    </p>
                    <nav className="signupinputs">
                        <nav className="row" id="signup-btns">
                            <button className="signup-btn" id="signup-btn-google">
                                <i className="bi bi-google" id="signup-icon-google"></i>
                                <p>Continue with Google</p>
                            </button>
                            <button className="signup-btn" id="signup-btn-facebook">
                                <i className="bi bi-facebook" id="signup-icon-facebook"></i>
                                <p>Continue with Facebook</p>
                            </button>
                            <button className="signup-btn" id="signup-btn-email">
                                <i className="bi bi-envelope " id="signup-icon-email"></i>
                                <p>Continue with email</p>
                            </button>
                        </nav>
                        <nav className="Warzonenews">
                            <input
                                type="checkbox"
                                name="warzonenews"
                                className="newscheckbox"
                            ></input>
                            <p className="warzone-news">
                                I do not wish to receive news from Warzone Elite
                                Company by email.
                            </p>
                        </nav>
                        <p className="signupTerms text-muted">
                            By continuing, you agree to Warzone Elite Company Terms of Use and
                            Privacy Policy.
                        </p>
                    </nav>

                    <p className="row-flex" id="logintoaccount">
                        Already have an account
                        <Link to={"/login"}>
                            <strong>Log in</strong>
                        </Link>
                    </p>
                </nav>
            </div>
        </div>
    );
};
export default SignUp;
