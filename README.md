Cron Job Service
A scalable and efficient Cron Job Service built with NestJS and MongoDB. This service allows users to create, update, delete, and retrieve cron jobs. It also supports webhook integration, rate limiting, and history logging for cron job executions.

Features
CRUD Operations: Create, read, update, and delete cron jobs.

Cron Job Scheduling: Schedule cron jobs to trigger at specific intervals (e.g., daily, weekly).

Webhook Integration: Receive and store data from external services via webhooks.

History Logging: Log the execution history of cron jobs, including responses and timestamps.

Rate Limiting: Prevent abuse with API throttling and rate limiting.

Scalable: Designed to handle a large number of cron jobs efficiently.

Technology Stack
Backend Framework: NestJS

Database: MongoDB

Libraries:

@nestjs/schedule for cron job scheduling.

mongoose for MongoDB object modeling.

@nestjs/throttler for rate limiting.

axios for making HTTP requests.

class-validator and class-transformer for input validation.

winston for logging.

Prerequisites
Before running the project, ensure you have the following installed:

Node.js (v16 or higher)

npm or yarn

MongoDB (local or cloud instance)

Setup Instructions
1. Clone the Repository
bash
Copy
git clone https://github.com/your-username/cron-job-service.git
cd cron-job-service
2. Install Dependencies
bash
Copy
npm install
3. Set Up Environment Variables
Create a .env file in the root directory and add the following variables:

env
Copy
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/cron-job-service?retryWrites=true&w=majority
Replace <username> and <password> with your MongoDB credentials.

4. Run the Application
bash
Copy
npm run start
The application will start on http://localhost:3000.

API Documentation
Cron Jobs Endpoints
Create a Cron Job
Endpoint: POST /cron-jobs

Request Body:

json
Copy
{
  "name": "Daily Backup",
  "link": "https://example.com/api/backup",
  "apiKey": "secret-key",
  "schedule": "0 0 * * *", // Daily at midnight
  "startDate": "2025-10-02T00:00:00.000Z"
}
Get All Cron Jobs
Endpoint: GET /cron-jobs

Update a Cron Job
Endpoint: PUT /cron-jobs/:id

Request Body:

json
Copy
{
  "name": "Updated Cron Job",
  "schedule": "0 12 * * *" // Daily at noon
}
Delete a Cron Job
Endpoint: DELETE /cron-jobs/:id

Webhooks Endpoints
Receive Webhook Data
Endpoint: POST /webhooks

Request Body:

json
Copy
{
  "data": { "key": "value" },
  "cronJobId": "64f8f8f8f8f8f8f8f8f8f8f8"
}
Get All Webhooks
Endpoint: GET /webhooks

Example Requests
Create a Cron Job
bash
Copy
curl -X POST http://localhost:3000/cron-jobs \
-H "Content-Type: application/json" \
-d '{
  "name": "Daily Backup",
  "link": "https://example.com/api/backup",
  "apiKey": "secret-key",
  "schedule": "0 0 * * *",
  "startDate": "2025-10-02T00:00:00.000Z"
}'
Get All Cron Jobs
bash
Copy
curl -X GET http://localhost:3000/cron-jobs
Trigger a Webhook
bash
Copy
curl -X POST http://localhost:3000/webhooks \
-H "Content-Type: application/json" \
-d '{
  "data": { "status": "success" },
  "cronJobId": "64f8f8f8f8f8f8f8f8f8f8f8"
}'
Database Schema
Cron Jobs Collection
json
Copy
{
  "name": "string",
  "link": "string",
  "apiKey": "string",
  "schedule": "string",
  "startDate": "date",
  "createdAt": "date",
  "updatedAt": "date"
}
Webhooks Collection
json
Copy
{
  "data": "object",
  "cronJobId": "ObjectId",
  "createdAt": "date"
}
History Collection
json
Copy
{
  "cronJobId": "ObjectId",
  "response": "object",
  "status": "string",
  "createdAt": "date"
}
Testing
To run unit tests, use the following command:

bash
Copy
npm run test
Logging
The application uses winston for logging. Logs are stored in the logs/ directory.

Deployment
To deploy the application, follow these steps:

Build the project:

bash
Copy
npm run build
Start the application in production mode:

bash
Copy
npm run start:prod
Use a process manager like PM2 to manage the application in production:

bash
Copy
pm2 start dist/main.js --name cron-job-service
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature).

Commit your changes (git commit -m 'Add some feature').

Push to the branch (git push origin feature/your-feature).

Open a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

