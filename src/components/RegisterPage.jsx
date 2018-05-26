import React from 'react';
import { Navbar, Panel } from 'react-bootstrap';
import RegisterForm from './RegisterForm';

class RegisterPage extends React.Component {
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
                        <RegisterForm/>
                    </Panel.Body>
                </Panel>

            </div>
        );
    }
}
export default RegisterPage;