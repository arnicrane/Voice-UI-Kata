# Customer Voice Check-in Kata

### Objective
> __KEY OBJECTIVE:__
> Build a simple app that allows a customer to check-in to their room using their voice at a hotel reception

Whilst this is a great exercise for practising, please spend a maximum of ONE HOUR on this scenario.

You may not complete it all, that is fine. It is better to complete an area to a high quality than to complete all areas at a low quality.

There is not a definitive 'right' answer, the point is for the applicant to be familiar with a set of requirements, and make some technical decisions that we can discuss when we meet. Eg, you chose to use X, why was that? What other options are available etc.

To apply, simple download this repository, complete the task, commit and push to a new empty repository and email us the URL.

Please do not fork or add a pull request.

### Requirements
- __AS__ a new customer entering the hotel lobby, __WHEN__ I walk up to the kiosk, __THEN__ I am asked to speak my room number
- __AS__ a customer has a valid booking number, __WHEN__ I speak this to the kiosk, __THEN__ I am presented with the names of the passengers on my booking and my room number
- __AS__ a customer has an invalid booking number, __WHEN__ I speak this to the kiosk, __THEN__ I am presented with the a request to speak again or contact the staff member on the reception desk
- __AS__ a customer who has just been shown my room number, __WHEN__ I walk away (or after 20 seconds), __THEN__ my room details are removed from the screen
- __AS__ a new customer entering the hotel lobby AND there is already someone else's information on the screen, __WHEN__ I say 'start again' as prompted on the screen, __THEN__ the screen is cleared and I am asked to speak my room number

### Technical Guidelines
- If this is a full-stack role - Create a basic and simple full stack application - The front end, should be very simple and basic, UI is not necessarily a priority for this exercise. _This can be done in a number of programming languages in less than 50 lines of code_
- If this is a UI role - Save time and use a suitable boilerplate. Prioritise the UI, rather than webcam / microphone, eg, use buttons to simulate some events. Suggested starting technology, `React`, `Redux`, `RxJs`
- Encorporate a voice API into your browser based application
- Browser takes voice as an input (booking number) and outputs the room details (Passengers and room numbers)
- Make some booking details up for your application. You do not need to create a database, but they should be not be stored in the front end
- Any voice APIs can be used, they can be cloud based or local. You do not need to use a chatbot engine
- You can use any programming language or framework, but there should be an understanding and justification for using them
