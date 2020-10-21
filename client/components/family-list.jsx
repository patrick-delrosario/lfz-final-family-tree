import React from 'react';
import ProfileList from './profile-list-item';
import ModalP from './modal-add-profile';

class FamilyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: []
    };
    this.getProfiles = this.getProfiles.bind(this);
  }

  componentDidMount() {
    this.getProfiles();
  }

  getProfiles() {
    fetch('/api/profiles')
      .then(result => result.json(result.rows))
      .then(result => { this.setState({ profiles: result }); })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const map = this.state.profiles.map(profile =>
      <ProfileList
        key={profile.profileId}
        profile={profile}
        setView={this.props.setView}
        getProfiles={this.getProfiles} />
    );
    return (
      <>
        <div className="center">
        Family Members
          <span>
            <ModalP
              getProfiles={this.getProfiles} />
          </span>
        </div>
        <div className="container">
          <div className="row">
            {map}
          </div>
        </div>
      </>
    );
  }
}

export default FamilyList;
