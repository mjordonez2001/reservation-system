# Restaurant Reservation System

## Live Website
A live version of the Restaurant Reservation System is able to be accessed through Heroku at [mo-reservation-system-frontend.herokuapp.com/](https://mo-reservation-system-frontend.herokuapp.com/) 

## Table of Contents
* [Summary](#summary)
* [Technologies Used](#technologies-used)
* [Features](#features)

## Summary
<p>
  This application is a restaurant reservation management system. Users are able to add new reservations to specific future dates & times, as well as edit, cancel, and manage that reservation. Users are also able to add new tables with specified capacity to be added to the reservation system. 
</p>

## Technologies Used
### Front-End
* JavaScript
* React.js
* Bootstrap 4
### Back-End
* Node.js
* PostgreSQL
* Knex.js
* Express.js

## Features
### Dashboard 
<p>
  The dashboard screen shows a list of all reservations for a specific date, as a well as all the status for all the tables in the 
  restaurant. Users are able to edit, seat, and cancel reservations from the dashboard. Users can see the reservations for other dates using the "Prev.", "Today", and "Next" buttons.
</p>

![Dashboard](/README_IMGS/dashboard.png)

### Creating new reservations 
<p>
  Users are able to create new reservations by filling out a form. 
</p>

![Create Reservation](/README_IMGS/createreservation.png)

### Editing existing reservations
<p>
  Users are able to edit existing reservations by updating the reservation form.
</p>

![Edit Reservation](/README_IMGS/editreservation.png)

### Creating tables
<p>
  Users are able to create new tables by filling out a form.
</p>

![Create Table](/README_IMGS/createtable.png)

## Seating reservation
<p>
  Users are able to seat reservations by clicking the "Seat" button in the dashboard. 
  This brings them to the Seat page where they can choose the table they want to seat the reservation at.
</p>

![Seat Reservation](/README_IMGS/seatreservation.png)

## Searching reservations
<p>
  Users are able to search for reservations by phone number. All reservations that contain the number (both whole and partial) will be displayed.
</p>

![Search Reservation](/README_IMGS/searchreservation.png)
