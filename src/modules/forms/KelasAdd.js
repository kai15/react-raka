import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';


class KelasAdd extends Component {

    emptyItem = {
        namaKelas: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'add') {
            const kelas = await (await fetch(`/api/v1/kelass/${this.props.match.params.id}`)).json();
            this.setState({ item: kelas });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;

        await fetch('/api/v1/kelass/', {
            method: 'POST',
            // (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/home');
    }

    render() {
        const { item } = this.state;
        const title = <h2>{item.id ? 'Edit Kelas' : 'Add Kelas'}</h2>;

        return <div className="main-content">

            <div className="padding-15px grid grid-2x">
                <div className="col-1">
                    <div>
                        <Container>
                            {title}
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Nama Kelas</Label>
                                    <Input type="text" name="namaKelas" id="namaKelas" value={item.namaKelas || ''}
                                        onChange={this.handleChange} autoComplete="namaKelas" />
                                </FormGroup>
                                <FormGroup>
                                    <Button color="primary" type="submit">Save</Button>{' '}
                                    <Button color="secondary" tag={Link} to="/table">Cancel</Button>
                                </FormGroup>
                            </Form>
                        </Container>
                    </div>
                </div>
            </div>
        </div>

    }
}

export default withRouter(KelasAdd);