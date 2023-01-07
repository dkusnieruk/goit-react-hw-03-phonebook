import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import ContactList from './ContactList/ContactList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      filter: '',
    };
  }

  handleRemove = id => {
    const newList = this.state.contacts.filter(item => item.id !== id);

    this.setState(
      {
        contacts: newList,
      },
      this.updateStorage
    );
  };

  handleInputChange = event => {
    const { value } = event.target;
    this.setState(
      {
        filter: value,
      },
      this.updateStorage
    );
  };

  handleSubmit = event => {
    event.preventDefault();
    const object = {
      id: nanoid(),
      name: event.target.elements.name.value,
      number: event.target.elements.number.value,
    };

    this.setState(
      {
        filter: '',
      },
      this.updateStorage
    );

    const checkArray = this.state.contacts.filter(contact => {
      const filterArray = contact.name.toLowerCase();
      const filterName = object.name.toLowerCase();

      if (filterArray.includes(filterName)) {
        return true;
      } else return false;
    });

    if (checkArray.length > 0) {
      alert(`Masz już kontakt o imieniu : ${object.name}`);
    } else this.state.contacts.push(object);
    event.target.reset();
  };
  handleSearch = () => {
    this.setState({
      contacts: this.state.contacts,
      filter: this.state.filter,
    });
  };

  updateStorage() {
    localStorage.setItem('contact', JSON.stringify(this.state.contacts));
  }

  componentDidMount() {
    const contact = localStorage.getItem('contact');
    if (contact)
      this.setState({
        contacts: JSON.parse(contact),
      });
  }

  render() {
    const { contacts, name, filter, number } = this.state;

    return (
      <>
        <ContactForm name={name} number={number} onSubmit={this.handleSubmit} />
        <Filter
          contacts={contacts}
          filter={filter}
          handleSearch={this.handleSearch}
          handleChange={this.handleInputChange}
        />
        <ContactList
          contacts={contacts}
          filter={filter}
          name={name}
          handleRemove={this.handleRemove}
        />
      </>
    );
  }
}

export default App;
