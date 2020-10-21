import React from 'react';

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
          <div>
            <h2>{this.state.profile.firstName}</h2>
            <p>{this.state.profile.LastName}</p>
          </div>
        </div>
        <div className="row center">
          <p className="detailbox">{this.state.profile.age}</p>
        </div>
      </div>
    );
  }
}

export default ProfileDetails;
