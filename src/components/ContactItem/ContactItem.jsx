import { Component } from 'react';
import css from '../ContactList/contactList.module.css';
import propTypes from 'prop-types';
class ContactItem extends Component {
  render() {
    return (
      <li className={css.singleItem} key={this.props.contact.id}>
        {this.props.contact.name}: {this.props.contact.number}
        <button
          className={css.removeButton}
          type="button"
          id={this.props.contact.id}
          onClick={() => this.props.handleRemove(this.props.contact.id)}
        >
          X
        </button>
      </li>
    );
  }
}

ContactItem.propTypes = {
  index: propTypes.number,
  handleRemove: propTypes.func,
  contacts: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      name: propTypes.string,
      number: propTypes.number,
    })
  ),
};

export default ContactItem;
