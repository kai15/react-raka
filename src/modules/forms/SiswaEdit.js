import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';


class SiswaEdit extends Component {

    emptyItem = {
        namaSiswa: ''
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
        // if (this.props.match.params.id !== 'new') {
            const siswa = await (await fetch(`/api/v1/siswas/${this.props.match.params.id}`)).json();
            this.setState({ item: siswa });
        // }
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
        await fetch('/api/v1/siswas/' + (item.id), {
            method:
                // (item.id) ? 'PUT' : 'POST',
                'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/table');
    }

    render() {
        const { item } = this.state;
        const title = <h2>Edit Siswa</h2>
        // <h2>{item.id ? 'Edit Siswa' : 'Add Siswa'}</h2>;

        return <div className="main-content">

            <div className="padding-15px grid grid-2x">
                <div className="col-1">
                    <div>
                        <Container>
                            {title}
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="name">Nama Siswa</Label>
                                    <Input type="text" name="namaSiswa" id="namaSiswa" value={item.namaSiswa || 'Kosongkan'}
                                        onChange={this.handleChange} autoComplete="namaSiswa" />
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

export default withRouter(SiswaEdit);