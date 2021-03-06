import React from 'react';

class DeleteProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    /* alert('Profile Deleted'); */
    const id = this.props.profile.profileId;
    const postProfile = {
      method: 'Delete',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch('/api/profiles/' + id, postProfile)
      .then(response => response.json())
      .then(data => { this.props.getProfiles(); })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <>
        <div onClick={this.handleClick}>
          Delete
        </div>
      </>
    );
  }
}

export default DeleteProfile;
