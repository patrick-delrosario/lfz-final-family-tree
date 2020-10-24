import React from 'react';
import EditProfile from './edit-profile';
import DeleteProfile from './delete-profile';

class ProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(`/api/profiles/${this.props.profileId}`)
      .then(response => response.json())
      .then(data => this.setState({ profile: data }))
      .catch(error => {
        console.error('There was a problem with your fetch GET operation: ', error);
      });
  }

  handleClick() {
    this.props.setView('catalog', {});
  }

  render() {
    if (!this.state.profile) return null;
    return (
      <div className="container">
        <div
          className="hover col-2 my-3 px-0 btn d-flex justify-content-start"
          onClick={this.handleClick}>
          &lt; Back to Family
          <i className="fas fa-book-open"></i>
        </div>
        <div className="d-flex justify-content-around">
          <div>
            <img src={this.state.profile.image} />
          </div>
          <div className="card-body">
            <h6 className="card-title">Full Name: {this.state.profile.firstName} {this.state.profile.lastName}</h6>
            <p className="card-text">Age: {this.state.profile.age}</p>
            <p className="card-text">Birthday: {this.state.profile.birthMonth} {this.state.profile.birthYear}</p>
            <p className="card-text">{this.state.profile.gender}</p>
            <p className="card-text">{this.state.profile.deceased}</p>
            <p className="card-text">{this.state.profile.birthPlace}</p>
            <p className="card-text">{this.state.profile.phoneNumber}</p>
            <p className="card-text">{this.state.profile.email}</p>
          </div>
        </div>
        <br />
        <button>
          <EditProfile
            key={this.state.profile.profileId}
            profile={this.state.profile}
            getProfiles={this.state.getProfiles} />
        </button>
        <button className="btn-delete" onClick={this.handleClick}>
          <DeleteProfile
            key={this.state.profile.profileId}
            profile={this.state.profile}
            getProfiles={this.state.getProfiles} />
        </button>
      </div>
    );
  }
}

export default ProfileDetails;
