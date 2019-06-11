import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor() {
    super()
    this.state = {
      allStocks: [],
      myPortfolio: [],
      filterChoice:"",
      sortChoice: null
    }
  }

  handleSort = (event) => {
    let stocksCopy = this.state.allStocks
    if (event.target.value === "Alphabetically") {
      this.setState({
        allStocks: stocksCopy.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
      })
    }
    else if (event.target.value === "Price") {
      this.setState({
       allStocks: stocksCopy.sort((a,b) => a.price - b.price)
      })
    }
  }

  handleFilterChoice = (event) => {
    this.setState({
      filterChoice: event.target.value
    })
  }

  removeFromPortfolio = (stockObj) => {
    let updatedPortfolio = this.state.myPortfolio.filter(stock => stock !== stockObj)
    this.setState({
      myPortfolio: updatedPortfolio
    })
  }

  addToPortfolio = (stockObj) => {
    let currentPortfolio = this.state.myPortfolio 
    currentPortfolio.push(stockObj)

    this.setState({
      myPortfolio: currentPortfolio
    })
  }

  componentDidMount() {
    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(stocks => this.setState({allStocks: stocks}))
  }

  render() {
    return (
      <div>
        <SearchBar handleFilterChoice={this.handleFilterChoice} handleSort={this.handleSort}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.allStocks.filter(stock => stock.type.includes(this.state.filterChoice))} handleClick={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer portfolio={this.state.myPortfolio} handleClick={this.removeFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
