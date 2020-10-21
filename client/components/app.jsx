import React from 'react';
import Header from './header';
import NavBar from './navbar';
import FamilyList from './family-list';
import ProfileDetails from './profile-detail';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params
      }
    });
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const window = this.state.view.name;
    if (window === 'catalog') {
      return (
        <div>
          <Header />
          <NavBar />
          <FamilyList
            setView={this.setView}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          <NavBar />
          <ProfileDetails
            profile={this.props.profile}
            setView={this.setView}
            profileId={this.state.view.params} />
        </div>
      );
    }
  }
}
