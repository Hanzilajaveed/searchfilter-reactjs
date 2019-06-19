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
      isloggedIn: false,
      searchUser: '',

      addplayer: [],
      addplayer_value: [],
      message: '',
      player_budget: '5000',
      player_count:0,
      max_player_value: '5',
      min_player_value: '0',
    }
    this.searchHandler = this.searchHandler.bind(this);
    // this.addPlayer = this.addPlayer.bind(this, item);
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

    increment 

    removeplayer = (item) => {
      // console.log('remove'+value.id);

      // const player_value = value.id;

      const remove_player = this.state.addplayer.filter(noplayer => {
        return noplayer !== item;
      })

      this.setState({
        player_budget: this.state.player_budget + item.id,

        addplayer: [...remove_player]
      })
    }

  render() {

    var { isLoaded, items, message, player_budget, player_count } = this.state;

    if (!isLoaded) {
      return <div> Loading... </div>;
    }
    else {
      if(player_count <= 5){
        // console.log("yes list is full");

      }
      else if (player_count == 5){
        // console.log("yes list is not full");

      }


        return (
          <div>
          <div>
            <h2> Player Budget: ${player_budget}</h2>
          </div>
          <div className="tc">
            <input type='text' className="ma2 pa2" onChange={this.searchHandler} value={this.state.searchUser}/>
            {
              this.state.message !== '' && <p className="bg-red">{message}</p>
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

            <div>

            <ul>
            {this.state.addplayer.map((item, index) => (
              <li key={index}>{item.name} <button className="dib ma2" onClick={this.removeplayer.bind(this,item)}>Remove Player</button></li>

              ))}

            </ul>
            </div>

            

           
          </div>
      );
    }
  }
}





export default Apiapp;
