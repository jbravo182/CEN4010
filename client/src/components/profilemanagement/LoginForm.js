import React, { useState } from "react";
import API from "../../utils/API";
import { Form, Alert, Button, Container } from "react-bootstrap";

function LoginForm(props) {
    const [loginFailed, setLoginFailed] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function loginHandle(event) {
        event.preventDefault();
        const credentials = {
            "email": email,
            "password": password
        };
        API.login(credentials)
            .then(res => loginResponseHandle(res, credentials.email))
            .catch(err => loginErrorHandle(err));
    }

    function loginErrorHandle(err) {
        if(err.response && err.response.status === 401) {
            setLoginFailed(true);
        } else {
            alert("Login error - " + err);
        }
    }

    function loginResponseHandle(response, email) {
        localStorage.setItem("auth_token", response.data);
        const request = {
            auth_token: response.data,
            email: email
        };
        API.getUser(request)
        .then(res => props.onLogin(res.data))
        .catch(err => alert("Login error - " + err));
    }

    function passwordChangeHandle(event) {
        setPassword(event.currentTarget.value);
    }

    function emailChangeHandle(event) {
        setEmail(event.currentTarget.value);
    }

    function dismissHandle() {
        setLoginFailed(false);
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                {loginFailed ? <Alert dismissable variant="danger" onClose={dismissHandle}>Incorrect Email or Password</Alert> : null}
                <Form inline onSubmit={e => loginHandle(e)}>
                    <Form.Group controlId="LoginForm.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="foo@bar.com" value={email} onChange={emailChangeHandle} />
                    </Form.Group>
                    <Form.Group controlId="LoginForm.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={passwordChangeHandle} />
                    </Form.Group>
                    <Button type="Submit">Login</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default LoginForm;