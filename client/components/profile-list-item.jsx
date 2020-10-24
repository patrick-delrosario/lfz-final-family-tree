import React from 'react';
import EditProfile from './edit-profile';

class ProfileList extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.setView('details', this.props.profile.profileId);
  }

  render() {
    return <>
      <div className="col-4 d-flex justify-content-around">
        <div className="card">
          <h6 className="card-title center"><strong>{this.props.profile.firstName} {this.props.profile.lastName}</strong></h6>
          <img src={this.props.profile.image} className="card-img-top" onClick={this.handleClick}></img>
          <button>
            <EditProfile
              key={this.props.profile.profileId}
              profile={this.props.profile}
              getProfiles={this.props.getProfiles} />
          </button>
        </div>
      </div>
    </>;
  }
}

export default ProfileList;
