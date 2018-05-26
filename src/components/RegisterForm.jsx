import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import { serviceConfig } from '../appSettings';
import { NotificationManager } from 'react-notifications';
import { withRouter } from 'react-router-dom';

class RegisterForm extends React.Component {
    constructor(props) { //props je properties?? 
        super(props);
        this.state = { //podesavamo atribuet na inuicijalne podatke
            username: '',
            email: '',
            password:''
        };
        this.handleChange = this.handleChange.bind(this); //KAO dependency injection u c#
        this.handleSubmit = this.handleSubmit.bind(this); //this je lokalizovan na moju komponentu, i ja ovde povezem/bindujem handleSubmit na this
    }
    handleChange(e) { //kada se desi bilo kakva promena (kada kucamo nesto npr)
        //console.log("State:", e.target);
        //const id = e.target.id;
        //const value = e.target.value;

        const { id, value } = e.target; //e je taj dogadjaj koji u sebi ima target, a target sadrzi id tog polja i vrednost polja k

        this.setState({ //dodeljujemo vrednost
            [id]:value
        });
    }

    handleSubmit(e) {                   //reaguje na submit dugme
        e.preventDefault();
        console.log("handlesubmit")
        const { username, email, password } = this.state;

        const data = {
            Handle: username,
            IsPublic: true,
            User: {
                UserName: username,
                Password: password,
                Email: email
            }
        }

        const reqOptions = {                //API sto smo radili... defaultna metoda je GET i tad nam en treba reqOptions, dok za POST, PATCH etc.
            method: 'POST',                 //treba i tu moramo da prosledimo data i da podesimo druge paramentre
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }
        fetch(`${serviceConfig.baseURL}/profiles`, reqOptions) //pozove servis  koji radi nesto i onda vrati da li je error ili success
            .then(response => {
                NotificationManager.success(response.message || response.statusText); //prikaze poruku da smo se uspesno registrovali
                this.props.history.push('/login'); //redirektujemo se na login stranicu
            })//moze se desiti i konflikt on MISLIM da potpada pod success?? to uglavnom znaci da si se vec registrovao sa tim kredencijalima
            .catch(response => {
                NotificationManager.error(response.message || response.statusText); //neuspesna registracija, doslo je do greske
            });
    }
    render() {
        const { username, email, password } = this.state;
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
                            id="email"
                            type="text"
                            placeholder="Email"
                            value={email}
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
                    <Button type="submit" block>Sign up</Button>
                </form>
            </div>
        );
    }
};

export default withRouter(RegisterForm);