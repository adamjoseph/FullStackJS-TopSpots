// Libs
import React from 'react';
import Axios from 'axios';

function TopSpot(props){
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.description}</td>
      <td><a className="btn btn-primary" target="_blank" href={`https://www.google.com/maps?q=${props.location[0]},${props.location[1]}`}>Go</a></td>
    </tr>
  )
}

TopSpot.propTypes = {
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  location: React.PropTypes.array,
  id: React.PropTypes.string
};

class MainTable extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      topspots: []
    };
  }

  componentDidMount(){
    Axios.get('http://0.0.0.0:3000/api/topspots')
      .then(response => {
        const topspots = response.data;
        this.setState({topspots});
      });
  }

  render() {
    return (

    <div className="container">
    <h1 className="text-center">FullStack JS TopSpots</h1>
      <table className="table table-striped">
        <tbody>
          {this.state.topspots.map(function(topspot, index){
            return (
              <TopSpot key={index}
                name={topspot.name}
                description={topspot.description}
                location={topspot.location}
               />
            );
          }.bind(this))}
        </tbody>
      </table>
    </div>
  );
  }
};

export default MainTable;
