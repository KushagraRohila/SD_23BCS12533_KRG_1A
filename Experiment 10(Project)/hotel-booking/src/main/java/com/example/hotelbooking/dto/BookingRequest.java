package com.example.hotelbooking.dto;

public class BookingRequest {
    private Long userId;
    private Long roomId;

    public BookingRequest() {
    }

    public BookingRequest(Long userId, Long roomId) {
        this.userId = userId;
        this.roomId = roomId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }
}
