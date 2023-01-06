import { Component } from 'react';
import css from '../ContactList/contactList.module.css';
import propTypes from 'prop-types';
import ContactItem from 'components/ContactItem/ContactItem';
class ContactList extends Component {
  render() {
    return (
      <ul className={css.listMain}>
        {this.props.contacts
          .filter(contact => {
            const searchType = this.props.filter.toLowerCase();
            const contactType = contact.name.toLowerCase();

            return contactType.includes(searchType);
          })
          .map((contact, index) => {
            return (
              <ContactItem
                contact={contact}
                index={index}
                handleRemove={this.props.handleRemove}
                key={index}
              />
            );
          })}
      </ul>
    );
  }
}

ContactList.propTypes = {
  contact: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      name: propTypes.string,
      number: propTypes.number,
    })
  ),
  filter: propTypes.string,
  handleRemove: propTypes.func,
};
export default ContactList;
