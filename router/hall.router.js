import express from "express";
import { hall } from "../general.js";

const hallRouter = express.Router();

hallRouter.get("/", (request, response) => {
  response.send(hall);
});

//Task 1 : CREATE a new hall
// number of seats available
//amenities inside the hall
// Price for 1 Hour

hallRouter.post("/", (request, response) => {
  const data = request.body;
  hall.push({
    SeatCapacity: data.SeatCapacity,
    id: Number(100 + hall.length),
    Amenities: data.Amenities,
    Price: data.Price,
  });
  
  hall
    ? response.send({ message: `New Room Created with id : ${hall[hall.length-1].id}` })
    : response.status(404).send({ message: "Room Not created !! Try again" });
});

//Task-2 : Book a New Room
//Customer Name
//Date
//Start Time
//End Time
//Room ID

hallRouter.put("/:id", (request, response) => {
  const { id } = request.params;
  const data = request.body;
  const isHallAvailable = hall.find((room) => room.id == id);
  if (!isHallAvailable)
    response.status(401).send({ message: "Invalid Room Number. Try Again" });
  else {
    let flag;
    const BookingRoom = hall.filter((room) => {
      if (room.id == isHallAvailable.id) {
        // console.log(room.date);
        let bookingDetail = {
          customerName: data.customerName,
          date: new Date(data.date).toLocaleDateString(),
          StartTime: data.StartTime,
          EndTime: data.EndTime,
        };
        if (
          room.date == bookingDetail.date &&
          room.StartTime == bookingDetail.StartTime
        ) {
          return (flag = false);
        } else {
          room.customerName = bookingDetail.customerName;
          room.date = bookingDetail.date;
          room.StartTime = bookingDetail.StartTime;
          room.EndTime = bookingDetail.EndTime;
          room.bookedStatus = bookingDetail.bookedStatus;
          return (flag = true);
        }
      }
    });
    console.log(BookingRoom);
    flag
      ? response.send({ message: "Room Booked Successfully" })
      : response.status(401).send({ message: "Failed to Book Room. 😮" });
  }
});

//Task-3: List all Rooms with Booked Data
//1. Room Name
//2. booked Status
//3. customer name
//4. Date
//5. Start Time
//6. End Time

hallRouter.get("/listbookedData", (request, response) => {
  const bookedRooms = hall.map((room) => {
    return {
      RoomName: room.RoomName,
      bookedStatus: room.bookedStatus,
      customerName: room.customerName,
      date: room.date,
      StartTime: room.StartTime,
      EndTime: room.EndTime,
    };
  });
  bookedRooms
    ? response.send(bookedRooms)
    : response
        .status(401)
        .send({ message: "Failed to Load Booked Data !!! Try Again" });
});

//Task-4 - Get all Customers data with following
//1. Customer Name
//2. Room Name
//3. Date
//4. Start Time
//5. End Time
hallRouter.get("/customersdata", (request, response) => {
  let customerData = hall
    .filter((hall) => {
      return hall.customerName != "" && hall.bookedStatus != "vacant";
    })
    .map((room) => {
      return {
        customerName: room.customerName,
        RoomName: room.RoomName,
        date: room.date,
        StartTime: room.StartTime,
        EndTime: room.EndTime,
      };
    });
  customerData
    ? response.send(customerData)
    : response
        .status(401)
        .send({ message: "Failed to Load Data. Try Again 😮" });
});

export default hallRouter;
