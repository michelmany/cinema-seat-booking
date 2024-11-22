import React, {useEffect, useState} from 'react';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const App = () => {
    const [sessions, setSessions] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [userId] = useState('test_user_id'); // Replace with actual user ID

    // Fetch cinema sessions
    useEffect(() => {
        fetch(`${BASE_URL}/sessions`)
            .then((res) => res.json())
            .then((data) => setSessions(data))
            .catch((error) => console.error('Error fetching sessions:', error));
    }, []);

    // Fetch seats for the selected session
    const fetchSeats = (sessionId) => {
        fetch(`${BASE_URL}/sessions/${sessionId}/seats`)
            .then((res) => res.json())
            .then((data) => {
                setSelectedSession(sessionId);
                setSeats(data);
                setSelectedSeats([]); // Reset selected seats
        })
        .catch((error) => console.error('Error fetching seats:', error));
    };

    // Handle seat selection
    const toggleSeatSelection = (seatNumber) => {
        setSelectedSeats((prevSelected) => {
            if (prevSelected.includes(seatNumber)) {
                return prevSelected.filter((seat) => seat !== seatNumber);
            } else {
                return [...prevSelected, seatNumber];
            }
        });
    };

    // Reserve selected seats
    const reserveSeats = () => {
        if (selectedSeats.length === 0) {
            alert('No seats selected.');
            return;
        }

        fetch(`${BASE_URL}/reservations/${selectedSession}/seats/reserve`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({seatNumbers: selectedSeats, userId}),
        }).then((res) => res.json()).then((data) => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert('Seats reserved successfully!');
                fetchSeats(selectedSession); // Refresh seat availability
            }
        }).catch((error) => console.error('Error reserving seats:', error));
    };

    return (
        <div style={{padding: '20px'}}>
            <h1>Cinema Seat Booking</h1>

            <h2>Sessions</h2>
            {sessions.map((session) => (
                <div key={session._id}>
                    <button onClick={() => fetchSeats(session._id)}>
                        {session.hallId.name} - {new Date(session.showtime).toLocaleString()}
                    </button>
                </div>
            ))}

            {selectedSession && (
                <div>
                    <h2>Seats</h2>
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {seats.map((seat) => (
                            <button
                                key={seat.seatNumber}
                                onClick={() => !seat.reserved && toggleSeatSelection(seat.seatNumber)}
                                style={{
                                    margin: '5px',
                                    padding: '10px',
                                    backgroundColor: seat.reserved
                                        ? 'gray'
                                        : selectedSeats.includes(seat.seatNumber)
                                            ? 'green'
                                            : 'white',
                                    cursor: seat.reserved ? 'not-allowed' : 'pointer',
                                }}
                                disabled={seat.reserved}
                            >
                                {seat.seatNumber}
                            </button>
                        ))}
                    </div>

                    <button onClick={reserveSeats} style={{marginTop: '20px'}}>
                        Reserve Selected Seats
                    </button>
                </div>
            )}
        </div>
    );
};

export default App;