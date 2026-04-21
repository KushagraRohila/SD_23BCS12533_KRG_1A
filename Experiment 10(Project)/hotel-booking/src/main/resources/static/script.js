// Tab switching
function switchTab(tabName) {
    // Hide all tab contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    // Remove active from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    
    // Find and activate the clicked button
    const clickedBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick') === `switchTab('${tabName}')`);
    if (clickedBtn) {
        clickedBtn.classList.add('active');
    }
    
    // Auto-load rooms when rooms tab is selected
    if (tabName === 'rooms') {
        loadAvailableRooms();
    }
}

// User Registration
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const firstName = document.getElementById('regFirstName').value;
    const lastName = document.getElementById('regLastName').value;
    const messageDiv = document.getElementById('regMessage');
    
    showMessage('Registering user...', 'loading', messageDiv);
    
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                firstName,
                lastName
            })
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('✓ Registration successful! User ID: ' + result.id, 'success', messageDiv);
            document.getElementById('registrationForm').reset();
        } else {
            showMessage('✗ ' + (result.message || 'Registration failed'), 'error', messageDiv);
        }
    } catch (error) {
        showMessage('✗ Error: ' + error.message, 'error', messageDiv);
    }
});

// User Profile
document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('profileUserId').value;
    const profileMessage = document.getElementById('profileMessage');
    const profileData = document.getElementById('profileData');
    
    showMessage('Fetching profile...', 'loading', profileMessage);
    
    try {
        const response = await fetch('/api/users/' + userId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('', '', profileMessage);
            displayProfile(result, profileData);
        } else {
            showMessage('✗ ' + (result.message || 'User not found'), 'error', profileMessage);
            profileData.classList.remove('active');
        }
    } catch (error) {
        showMessage('✗ Error: ' + error.message, 'error', profileMessage);
        profileData.classList.remove('active');
    }
});

function displayProfile(user, container) {
    container.innerHTML = `
        <p><span class="label">ID:</span> ${user.id}</p>
        <p><span class="label">Username:</span> ${user.username}</p>
        <p><span class="label">Email:</span> ${user.email}</p>
        <p><span class="label">First Name:</span> ${user.firstName}</p>
        <p><span class="label">Last Name:</span> ${user.lastName}</p>
    `;
    container.classList.add('active');
}

// Booking functionality
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const roomId = document.getElementById('roomId').value;
    const messageDiv = document.getElementById('message');
    
    if (!userId || !roomId) {
        showMessage('Please fill in all fields', 'error', messageDiv);
        return;
    }
    
    showMessage('Processing your booking...', 'loading', messageDiv);
    
    try {
        const response = await fetch('/api/book-room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: parseInt(userId),
                roomId: parseInt(roomId)
            })
        });
        
        const result = await response.text();
        
        if (response.ok) {
            showMessage('✓ ' + result, 'success', messageDiv);
            document.getElementById('bookingForm').reset();
        } else {
            showMessage('✗ ' + result, 'error', messageDiv);
        }
    } catch (error) {
        showMessage('✗ Error: ' + error.message, 'error', messageDiv);
    }
});

function showMessage(message, type, container) {
    container.textContent = message;
    container.className = 'message ' + type;
}

// Add Room Form
document.getElementById('addRoomForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const type = document.getElementById('roomType').value;
    const price = parseFloat(document.getElementById('roomPrice').value);
    const messageDiv = document.getElementById('addRoomMessage');
    
    showMessage('Adding room...', 'loading', messageDiv);
    
    try {
        const response = await fetch(`/api/rooms?type=${encodeURIComponent(type)}&price=${price}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showMessage('✓ Room added successfully! Room ID: ' + result.id, 'success', messageDiv);
            document.getElementById('addRoomForm').reset();
            // Reload rooms list
            setTimeout(() => loadAvailableRooms(), 500);
        } else {
            showMessage('✗ Failed to add room', 'error', messageDiv);
        }
    } catch (error) {
        showMessage('✗ Error: ' + error.message, 'error', messageDiv);
    }
});

// Load all rooms
async function loadAllRooms() {
    const messageDiv = document.getElementById('roomsMessage');
    const roomsList = document.getElementById('roomsList');
    
    showMessage('Loading rooms...', 'loading', messageDiv);
    
    try {
        const response = await fetch('/api/rooms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const rooms = await response.json();
        
        if (response.ok) {
            showMessage('', '', messageDiv);
            displayRooms(rooms, roomsList);
        } else {
            showMessage('✗ Failed to load rooms', 'error', messageDiv);
            roomsList.innerHTML = '';
        }
    } catch (error) {
        showMessage('✗ Error: ' + error.message, 'error', messageDiv);
        roomsList.innerHTML = '';
    }
}

// Load available rooms only
async function loadAvailableRooms() {
    const messageDiv = document.getElementById('roomsMessage');
    const roomsList = document.getElementById('roomsList');
    
    showMessage('Loading available rooms...', 'loading', messageDiv);
    
    try {
        const response = await fetch('/api/rooms/available', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        const rooms = await response.json();
        
        if (response.ok) {
            showMessage('', '', messageDiv);
            displayRooms(rooms, roomsList);
        } else {
            showMessage('✗ Failed to load available rooms', 'error', messageDiv);
            roomsList.innerHTML = '';
        }
    } catch (error) {
        showMessage('✗ Error: ' + error.message, 'error', messageDiv);
        roomsList.innerHTML = '';
    }
}

function displayRooms(rooms, container) {
    if (rooms.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999; padding: 40px;">No rooms found</p>';
        return;
    }
    
    container.innerHTML = rooms.map(room => `
        <div class="room-card">
            <h3>Room #${room.id}</h3>
            <p><span class="label">Type:</span> ${room.type}</p>
            <p><span class="label">Price:</span> $${room.price.toFixed(2)}/night</p>
            <span class="room-status ${room.available ? 'available' : 'unavailable'}">
                ${room.available ? '✓ Available' : '✗ Booked'}
            </span>
        </div>
    `).join('');
}
