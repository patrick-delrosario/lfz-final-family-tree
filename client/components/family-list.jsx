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
        <div className="container">
          <div className="row">
            <h3 className="col"><strong>Family Members</strong></h3>
            <div className="add-item col">
              <ModalP
                getProfiles={this.getProfiles} />
            </div>
          </div>
          <hr></hr>
          <div className="row">
            {map}
          </div>
          <form className="add-item" action="/upload" method="POST" encType="multipart/form-data">
            <span>File</span>
            <input name="myImage" type="file" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}

export default FamilyList;
