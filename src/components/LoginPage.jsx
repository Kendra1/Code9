import React from 'react';
import { Navbar, Panel } from 'react-bootstrap';
import LoginForm from './LoginForm';

class LoginPage extends React.Component {

    render() {
        return (
            <div>
                <Navbar className="navbar-insta">
                    <Navbar.Header>
                        <Navbar.Brand className="navbar-brand-insta">
                            Code9 Insta
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>;

                <Panel>
                    <Panel.Body>
                        <LoginForm />
                    </Panel.Body>
                </Panel>

            </div>
        );
    }

};

export default LoginPage;