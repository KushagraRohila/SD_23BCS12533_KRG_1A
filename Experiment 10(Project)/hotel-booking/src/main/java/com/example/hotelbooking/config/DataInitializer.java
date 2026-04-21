package com.example.hotelbooking.config;

import com.example.hotelbooking.entity.Room;
import com.example.hotelbooking.repository.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoomRepository roomRepository;

    public DataInitializer(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if rooms already exist
        if (roomRepository.count() == 0) {
            // Add sample rooms
            roomRepository.save(new Room("Single", 50.0, true));
            roomRepository.save(new Room("Double", 75.0, true));
            roomRepository.save(new Room("Deluxe", 100.0, true));
            roomRepository.save(new Room("Suite", 150.0, true));
            roomRepository.save(new Room("Single", 50.0, true));
            roomRepository.save(new Room("Double", 75.0, false));
            
            System.out.println("Sample rooms initialized successfully!");
        }
    }
}
