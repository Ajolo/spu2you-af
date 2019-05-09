# spu2you-af

The following project is intended for the use of spu2you.com and translates requests into SQL queries, returning
and creating reservation details. All results are set in the body of the request and are given in JSON format, indexed
by return order.

## Examples

This document shows examples of spu2you-af function GET requests, with the Azure Function key omitted in each case.
Parameters passed in, which are then handled using req.query.[parameter] are bracketed like so.

### getUserReservations

Returns a specified user's reservations for ALL time -- frontend should probably be using getActiveUserReservations

```
https://spu2you-af.azurewebsites.net/api/Orchestrator?code=[key]==&func=getUserReservations&uEmail=[email]
```

### getActiveUserReservations

Returns only _active_ (read: today onward) reservations

```
https://spu2you-af.azurewebsites.net/api/Orchestrator?code=[key]==&func=getActiveUserReservations&uEmail=[email]
```

### addReservation

Creates a reservation for the user on the specified date for the specified time slot

```
https://spu2you-af.azurewebsites.net/api/Orchestrator?code=[key]==&func=addReservation&uEmail=[email]&date=[date]&timeID=[timeId]
```

### getUsedTimeSlots

Retrieves all taken timeslots for a given date

```
https://spu2you-af.azurewebsites.net/api/Orchestrator?code=[key]==&func=getUsedTimeSlots&date=[date]
```

### getUserReservationsDate

Gets reservations for a given user on a specific date

```
https://spu2you-af.azurewebsites.net/api/Orchestrator?code=[key]==&func=getUserReservationsDate&uEmail=[email]&date=[date]
```

### getReservations

Returns all reservations for a specified date

```
https://spu2you-af.azurewebsites.net/api/Orchestrator?code=[key]==&func=getReservations&date=[date]
```

### addUser

Adds user profile to database for future reservation records

```
https://spu2you-af.azurewebsites.net/api/Orchestrator?code=[key]==&func=addUser&uEmail=[email]
```

### deleteReservation

Deletes a reservation by specified ResID

```
https://spu2you-af.azurewebsites.net/api/Orchestrator?code=[key]==&func=deleteReservation&ResID=[ResID]
```
