import React from 'react';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
      modal: {
        familyId: 1,
        treeId: 1,
        firstName: this.props.profile.firstName,
        lastName: this.props.profile.lastName,
        age: this.props.profile.age,
        birthMonth: this.props.profile.birthMonth,
        birthYear: this.props.profile.birthYear,
        gender: this.props.profile.gender,
        deceased: this.props.profile.deceased,
        birthPlace: this.props.profile.birthPlace,
        phoneNumber: this.props.profile.phoneNumber,
        email: this.props.profile.email,
        image: this.props.profile.image
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState({
      isClicked: !this.state.isClicked
    });
  }

  handleChange(event) {
    const { modal } = { ...this.state };
    const currentState = modal;
    const { name, value } = event.target;
    currentState[name] = value;

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Profile Has Been Edited');

    const id = this.props.profile.profileId;
    const patchProfile = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.modal)
    };

    fetch('/api/profiles/' + id, patchProfile)
      .then(res => res.json())
      .then(data => { this.props.getProfiles(); })
      .catch(error => {
        console.error(error);
      });

    this.setState({
      isClicked: !this.state.isClicked
    });
  }

  render() {
    if (!this.state.isClicked) {
      return (
        <>
          <div onClick={this.handleClick}>
            EDIT
          </div>
        </>
      );
    } else {
      return (
        <>
          <div>
            <div className="bigSquare">
              <div className="modal-content">
                <span className="close" onClick={this.handleClick}>&times;</span>
                <div>Edit Profile</div>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    First Name:
                    <input
                      name="firstName"
                      type="text"
                      value={this.state.modal.firstName}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Last Name:
                    <input
                      name="lastName"
                      type="text"
                      value={this.state.modal.lastName}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Age:
                    <input
                      name="age"
                      type="number"
                      value={this.state.modal.age}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Birth Month:
                    <input
                      name="birthMonth"
                      type="text"
                      value={this.state.modal.birthMonth}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Birth Year:
                    <input
                      name="birthYear"
                      type="number"
                      value={this.state.modal.birthYear}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Gender:
                    <input
                      name="gender"
                      type="text"
                      value={this.state.modal.gender}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Deceased:
                    <input
                      name="deceased"
                      type="text"
                      value={this.state.modal.deceased}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Birth Place:
                    <input
                      name="birthPlace"
                      type="text"
                      value={this.state.modal.birthPlace}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Phone Number:
                    <input
                      name="phoneNumber"
                      type="text"
                      value={this.state.modal.phoneNumber}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Email:
                    <input
                      name="email"
                      type="text"
                      value={this.state.modal.email}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <label>
                    Image:
                    <input
                      name="image"
                      type="file"
                      value={this.state.modal.image}
                      onChange={this.handleChange} />
                  </label>
                  <br />
                  <input type="submit" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

export default EditProfile;
