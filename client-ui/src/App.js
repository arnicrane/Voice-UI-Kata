import React, { Component } from "react";
import HeaderBar from "./components/HeaderBar";
import BookingDetails from "./components/BookingDetails";
import RetryPrompt from "./components/RetryPrompt";
import Dictaphone from "./components/Dictaphone";
import WelcomeMessage from "./components/WelcomeMessage";
import { fetchBookingDetails } from './api/bookingDetails';
import TuiHolidayImg from "./icons/urlaubserlebnisse-tui.jpeg";
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
        {this.state.microphoneAccess && (
          <Dictaphone
            onValidNumberCaptured={this.fetchBookingDetailsForRoomNumber}
            onResetPhraseCaptured={this.resetStateToDefaults}
          />)}
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
    if (this.state.microphoneAccess) {
      return (
        <React.Fragment>
          <BookingDetails
            bookingDetails={this.state.bookingDetails}
          />
          <img src={TuiHolidayImg} title="Customer Holiday Image" alt="TUI Hotels" />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <BookingDetails
            bookingDetails={this.state.bookingDetails}
          />
          <br></br>
          <button
            id="resetScreen"
            onClick={this.resetStateToDefaults}
          >Reset Screen</button>
          <br></br>
          <img src={TuiHolidayImg} title="Customer Holiday Image" alt="TUI Hotels" />
        </React.Fragment>
      );
    }
  }

  renderManualRoomChoicePanel = () => {
    // TODO: Move me to a subcomponent and integrate the title message into the WelcomeMessage component
    return (
      <React.Fragment>
        <h4>{this.state.retryVoicePrompt ? "Room not found - Please choose one of the other rooms." : "Welcome to your holiday - Choose a Room below"}</h4>
        <button
          id="roomOne"
          onClick={() => {this.fetchBookingDetailsForRoomNumber(1)}}
        >Room 1</button>
        <button
          onClick={() => {this.fetchBookingDetailsForRoomNumber(2)}}
        >Room 2</button>
        <button
          onClick={() => {this.fetchBookingDetailsForRoomNumber(3)}}
        >Room 3</button>
        <button
          id="invalidRoom"
          onClick={() => {this.fetchBookingDetailsForRoomNumber(4)}}
        >Invalid Room</button>
      </React.Fragment>
    );
  }

  configureMicAccess = async () => {
    // Obtain access to the browser's microphone (if not already allowed by default)
    const microphoneAccess = await this.checkMicPermissions();

    if (microphoneAccess !== 'authorized') {
      console.warn("Browser Permissions error\n-\nMicrophone permissions have been rejected.\n Please change the MIC settings\nin your browser to be ALLOWED & then\nreload the page.")
    } else {
      this.setState({microphoneAccess: true});
    }
  }

  checkMicPermissions = async () => {
    //
    // This only works on https secure sites and http://localhost (Google blocked it for insecure sites)
    // displays a web browser modal dialogue for accepting / rejecting access to the microphone
    //
    return await navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log('accepted microphone permissions')
        return 'authorized';
      })
      .catch(() => {
        console.log('rejected microphone permissions')
        return 'denied';
      });
  }
}

export default App;
