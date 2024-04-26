# Truck Repair Reservation Backend

This repository contains the backend code for a truck repair reservation system. It utilizes Node.js with Express for server-side logic and MongoDB for database management. 

## Installation

1. Clone the repository:

    ```bash
    git clone <repository_url>
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

## Usage

To run the server, execute:

```bash
npm start
```

The server will start running at `http://localhost:<port_number>/`.

## API Endpoints

### Appointments

- `GET /appointments`: Get all appointments.
- `POST /appointments`: Create a new appointment.
- `GET /appointments/appointment`: Get a specific appointment.
- `PUT /appointments/appointment`: Update a specific appointment.
- `DELETE /appointments/appointment`: Delete a specific appointment.


## Swagger Documentation

Swagger documentation is accessible at `/api-docs`.

## Error Handling

The backend handles errors with custom middleware. If a route is not found, it returns a 404 error. For other errors, it returns a 500 error along with an error message.

## Dependencies

- Express: Web application framework for Node.js.
- Mongoose: MongoDB object modeling for Node.js.
- dotenv: Loads environment variables from a `.env` file.
- body-parser: Parse incoming request bodies.
- cors: Enable Cross-Origin Resource Sharing.
- swagger-ui-express: Middleware to serve Swagger UI.
