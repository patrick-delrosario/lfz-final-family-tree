import React from 'react';
import DeleteProfile from './delete-profile';
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
          <div>
            <EditProfile
              key={this.props.profile.profileId}
              profile={this.props.profile}
              getProfiles={this.props.getProfiles}/>
          </div>
          <img src={this.props.profile.image} className="card-img-top" onClick={this.handleClick}></img>
          <div className="card-body">
            <h6 className="card-title">{this.props.profile.firstName} {this.props.profile.lastName}</h6>
            <p className="card-subtitle mb-2 text-muted">Age: {this.props.profile.age}</p>
            <p className="card-text">{this.props.profile.birthMonth} {this.props.profile.birthYear}</p>
          </div>
          <button>
            <DeleteProfile
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
