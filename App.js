import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [, setTextFileContent] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors, formValues, isSubmit]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        } else if (values.confirmPassword !== values.password) {
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };

    const gotoLink = (link, e) => {
        e.preventDefault();
        console.log(link);
        window.location.href = link;
    };

    useEffect(() => {
        // Fetch and read text file contents
        fetchTextFileContent();
    }, []);

    const fetchTextFileContent = async () => {
        try {
            const response = await fetch("/Users/shivamchourasia/Downloads/SAML URLS IN REACT.txt");
            const content = await response.text();
            setTextFileContent(content);
        } catch (error) {
            console.error("Error fetching text file:", error);
        }
    };

    return (
        <>
            <div className="bgImg"></div>
            <div className="container">
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div className="ui message success">Signed in successfully</div>
                ) : (
                    console.log("Entered Details", formValues)
                )}
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="ui divider"></div>
                    <div className="ui form">
                        <div className="field">
                            <label>Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formValues.username}
                                onChange={handleChange}
                            />
                            <p>{formErrors.username}</p>
                        </div>
                      
                        <div className="field">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                            <p>{formErrors.password}</p>
                        </div>
                      
                        <button type="submit" className="fluid ui button blue">
                            Submit
                        </button>
                        <p>
                            <button
                                className="fluid ui button blue"
                                onClick={(e) => gotoLink("https://dev-60700936.okta.com/app/dev-60700936_reactlandingpage_1/exkgp6mo8cMGlpeSu5d7/sso/saml", e)}
                            >
                                Login With Okta
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}

export default App;
