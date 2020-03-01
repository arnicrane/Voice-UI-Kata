import React, { Component } from "react";
// Placeholder Dependencies - Still need to be created and implemented
import HeaderBar from "./components/HeaderBar";
import BookingDetails from "./components/BookingDetails";
import RetryPrompt from "./components/RetryPrompt";
import Dictaphone from "./components/Dictaphone";
import WelcomeMessage from "./components/WelcomeMessage";
import { fetchBookingDetails } from './api/bookingDetails';
import "./styles/App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingDetails: undefined,
      retryVoicePrompt: false,
      microphoneAccess: false,
      resetScreen: false
    };
  }

  componentDidMount() {
    this.configureMicAccess();
  }

  componentDidUpdate(prevState, prevProps) {
    if (this.state.resetScreen) {
      this.resetStateToDefaults();
    }
  }

  resetStateToDefaults = () => {
    this.setState({
      bookingDetails: undefined,
      retryVoicePrompt: false,
      resetScreen: false
    });
  }

  displayRetryPrompt = () => {
    this.setState({
      bookingDetails: undefined,
      retryVoicePrompt: true
    });
  }

  fetchBookingDetailsForRoomNumber = async roomNumber => {
    const detailsOrNull = await fetchBookingDetails(roomNumber);
    if (detailsOrNull) {
      this.setState({
        bookingDetails: detailsOrNull,
        retryVoicePrompt: false
      });
    } else {
      this.displayRetryPrompt();
    }
  }

  render() {
    return (
      <React.Fragment>
        <HeaderBar />
        <br/><br/>
        {this.renderVisibleComponents()}
      </React.Fragment>
    );
  }

  renderVisibleComponents = () => {
    if (this.state.bookingDetails) {
      return this.renderBookingDetails();
    } else if (this.state.microphoneAccess) {
      return (this.state.retryVoicePrompt ? <RetryPrompt /> : <WelcomeMessage />);
    } else {
      return this.renderManualRoomChoicePanel();
    }
  }

  renderBookingDetails = () => {
    return (
      <BookingDetails
        bookingDetails={this.state.bookingDetails}
      />
    );
  }
}

export default App;
