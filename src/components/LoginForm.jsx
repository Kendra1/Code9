import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { serviceConfig } from '../appSettings';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';


class LoginForm extends React.Component {
    constructor(props) { //props je od react-a
        super(props);
        this.state = { //inicijalno podesavamoS
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this); //KAO dependency injection u c#
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) { //kada se desi bilo kakva promena (kada kucamo nesto npr)
        //console.log("State:", e.target);
        //const id = e.target.id;
        //const value = e.target.value;

        const { id, value } = e.target; //e je taj dogadjaj koji u sebi ima target, a target sadrzi id tog polja i vrednost polja k

        this.setState({ //dodeljujemo vrednost
            [id]: value
        });
    }

    handleSubmit(e) {                   //reaguje na submit dugme
        e.preventDefault();
        console.log("handlesubmit")
        const { username, password } = this.state;
    //kako je defaultna metoda GET tada nam ne treba req options vec samo kroz URL karakteristican GET metodi prosledjujemo sve 
        fetch(`${serviceConfig.baseURL}/tokens/request?username=${username}&password=${password}`) //pozove servis  koji radi nesto i onda vrati da li je error ili success
            .then(response => {
                if (!response.ok) {
                    return Promise.reject(response; //prikaze poruku da smo se uspesno logovali
                }
                return response.json();
            })
            .then(data => {
                if (data && data.token) {
                    localStorage.setItem('user', JSON.stringify(data));
                }
                this.props.history.push('/profile')s
            })
            .catch(response => {
                NotificationManager.error(response.message || response.statusText); //neuspesan login, doslo je do greske ili taj korisnik ne postoji
                this.setState({ submitted: false });
            });

    }



    render() {
        const { username, password } = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <FormControl
                            id="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            id="password"
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <Button type="submit" block>Login</Button>
                </form>
            </div>
        );
    }


};

export default withRouter(LoginForm);
