package com.example.hotelbooking.controller;

import com.example.hotelbooking.entity.Room;
import com.example.hotelbooking.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping
    public List<Room> getAllRooms() {
        return roomService.getAllRooms();
    }

    @GetMapping("/available")
    public List<Room> getAvailableRooms() {
        return roomService.getAvailableRooms();
    }

    @GetMapping("/{roomId}")
    public Room getRoomById(@PathVariable Long roomId) {
        return roomService.getRoomById(roomId);
    }

    @PostMapping
    public Room createRoom(@RequestParam String type, @RequestParam double price) {
        return roomService.createRoom(type, price);
    }

    @PutMapping("/{roomId}")
    public Room updateRoom(@PathVariable Long roomId, 
                           @RequestParam String type, 
                           @RequestParam double price,
                           @RequestParam boolean available) {
        return roomService.updateRoom(roomId, type, price, available);
    }

    @DeleteMapping("/{roomId}")
    public String deleteRoom(@PathVariable Long roomId) {
        roomService.deleteRoom(roomId);
        return "Room deleted successfully";
    }
}
