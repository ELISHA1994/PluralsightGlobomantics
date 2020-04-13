import React, { Component } from 'react';
//import logo from './logo.svg';
import './main-page.css';
import Header from './header';
import FeaturedHouse from './featured-house';
import HouseFilter from './house-filter';

class App extends Component {

  state = {}

  componentDidMount() {
    this.fetchHouses();
  }

  fetchHouses = () => {
    fetch('/houses.json')
    .then(rps => rps.json())
    .then(allHouses => {
      this.allHouses = allHouses;
      this.determineFeaturedHouse();
      this.determineUniqueCountries();
    })
  }

  determineFeaturedHouse = () => {
    if (this.allHouses) {
      const randomIndex = Math.floor(Math.random() * this.allHouses.length);
      const featuredHouse =  this.allHouses[randomIndex];
      this.setState({ featuredHouse });
    };
  }

  determineUniqueCountries = () => {
    const countries = this.allHouses
      ? Array.from(new Set(this.allHouses.map(h => h.country)))
      : [];
    countries.unshift(null);
    this.setState({ countries });
  }

  filterHouses = (country) => {
    const filterHouses = this.allHouses.filter((h) => h.country === country);
    this.setState({ filterHouses });
    this.setState({ country });
  }

  render() {
    return (
      <div className="container">
        <Header subtitle="Providing houses world wide"/>
        <HouseFilter countries={this.state.countries} filterHouses={this.filterHouses} />
        <FeaturedHouse house={this.state.featuredHouse} />
      </div>
    );
  }
}

export default App;