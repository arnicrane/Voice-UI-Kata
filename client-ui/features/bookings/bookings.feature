Feature: Bookings
  Background:
    # Place global setup lines here. They will be run before every scenario.
    Given I am on the home page

  Scenario: Choosing a valid room without voice
    Given I have rejected microphone permissions
    When I submit a valid room choice by click
    Then I should be shown some booking details

  Scenario: Choosing an invalid room without voice
    Given I have rejected microphone permissions
    When I submit an invalid room choice by click
    Then I should be shown an error banner with a helpful prompt

  Scenario: Resetting the screen for the next customer without voice
    Given I have rejected microphone permissions
    When I submit a valid room choice by click
    And I press the Reset Screen button
    Then I should be shown the initial room choice panel

  Scenario: Room details disappear after inactivity
    Given I have rejected microphone permissions
    When I submit a valid room choice by click
    And I wait for over 20 seconds
    Then I should be shown the initial room choice panel

  Scenario: Choosing a valid room with voice
    Given I have accepted microphone permissions
    When I submit a valid room choice by voice
    Then I should be shown some booking details

  Scenario: Choosing an invalid room with voice
    Given I have accepted microphone permissions
    When I submit an invalid room choice by voice
    Then I should be shown an error banner with a helpful prompt for voice
