# spu2you-af

The following project is intended for the use of spu2you.com and translates requests into SQL queries, returning 
and creating reservation details. All results are set in the body of the request and are given in JSON format, indexed 
by return order. 

## Examples

This document shows examples of spu2you-af function GET requests, with the Azure Function key omitted in each case. 
Parameters passed in, which are then handled using req.query.[parameter] are bracketed like so. 

### getUserReservations

Returns a specified user's reservations

What things you need to install the software  how to install them

```
https://spu2you-af.azurewebsites.net/api/Orchestrator?code=[key]==&func=getUserReservations&uEmail=[email]
```

