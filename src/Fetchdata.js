import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import 'tachyons';
import  App from './App';


function searchingFor(searchUser){
  return function(x){
    return x.name.toLowerCase().includes(searchUser.toLowerCase()) || !searchUser;
  }
}

class Fetchdata extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
      message: '',
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

        addPlayer = (item) =>{

      console.log(item);

      const newItem = item.name;
      const player_value = item.id;
      const isONTheList = this.state.addplayer.includes(item);
      

      if(isONTheList) {

        this.setState({
          message: 'This player is already on the list.'
        })
      }

      else {
        
        this.setState(prevState => ({
          player_count: this.state.player_count + 1,
          player_budget: this.state.player_budget - player_value,
          message: '',
        addplayer: [...prevState.addplayer, item],


        // addplayer_value: [...this.state.addplayer.concat(player_value)]

        // addplayer: [...this.state.addplayer.concat(player_value)]

      }));
        // console.log('id'+player_value);

      }
        console.log("player count",this.state.player_count);

       console.log(this.state.addplayer);
    }

  render() {

    var { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div> Loading... </div>;
    }
    else {
        return (
          <div className="tc">
            <input type='text' className="ma2 pa2" onChange={this.searchHandler} value={this.state.searchUser}/>
            {
              this.state.message !== '' && <p className="bg-red">{this.state.message}</p>
            }

            <div>{
              this.state.items.filter(searchingFor(this.state.searchUser)).map(item =>
                  <div key={item.id}>
                    <h3 className="dib ph5"> {item.name} </h3>
                    <h3 className="dib ph5"> {item.id} </h3>
                    
                    <button className="dib" onClick={this.addPlayer.bind(this, item)}>Add Player</button>
                  </div>
              )
            }</div>
            </div>
      );
    }
  }
}

export default Fetchdata;
