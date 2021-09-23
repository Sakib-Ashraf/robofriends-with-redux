import React, { Component } from "react";
import CardList from "../components/CardList";
import { connect } from 'react-redux';
import Scroll from '../components/Scroll';
import ErrorBoundary from "../components/ErrorBoundary";
import SearchBar from "../components/SearchBar";
import "./App.css";
import { setSearchField, requestRobots } from '../actions';


const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    };
};



class App extends Component {
    componentDidMount() {
        this.props.onRequestRobots();
    }

    render() {
        const { onSearchChange, searchField, robots, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });
        return isPending ?
            (<h1> loading... </h1>) :
            (    <div className="tc">
                    <h1 className="f1 pa2 ma2 tc">robofriends</h1>
                    <SearchBar searchChange={onSearchChange} />
                    <Scroll>
                    <ErrorBoundary>
                        <CardList robots={filteredRobots} />
                    </ErrorBoundary>
                    </Scroll>
                </div>
            );
            
        }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);