import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import 'tachyons';


function searchingFor(searchUser){
  return function(x){
    return x.name.toLowerCase().includes(searchUser.toLowerCase()) || !searchUser;
  }
}

class Apiapp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      searchUser: '',
    }
    this.searchHandler = this.searchHandler.bind(this);
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json,
        })
      });
  }

  searchHandler(event){
        this.setState({
            searchUser: event.target.value
        })
    }

  render() {

    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div> Loading... </div>;
    }
    else {
        return (
          <div className="tc">
          <input type='text' className="ma4 pa2" onChange={this.searchHandler} value={this.state.searchUser}/>
          {
            this.state.items.filter(searchingFor(this.state.searchUser)).map(item =>
                <div key={item.id}>
                  <h3> {item.name} </h3>
                </div>
            )
          }
          </div>
          
      );
    }
  }
}

export default Apiapp;
