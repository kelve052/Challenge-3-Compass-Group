# Compass Challenge 3
A Veterinary Clinic API built with Node.js and Express for managing veterinary services. A client hired Compass to build a new microservice for its veterinary franchise. This microservice will be used by all the clinics they own for internal client and attendances management.

This project is based on the [original work of Kelve Oliveira](https://github.com/kelve052/Challenge-2-Compass).

## Features

<details>
<summary><strong>Auth</strong></summary>
<li> Route POST
</details>

<details>
<summary><strong>Tutor</strong></summary>
<li> Route GET
<li> Route POST
<li> Route DELETE
<li> Route PUT
</details>

<details>
<summary><strong>Pet</strong></summary>
<li> Route POST
<li> Route DELETE
<li> Route PUT
</details>

## Installation

To run this project locally, please follow these steps:
1. Clone the repository:
```bash
git clone <repository-url>
```

2. Navigate to the project directory:
```bash
cd <project-directory>
```

3. Install dependencies:
```bash
npm install
```

4. Compile the files to JavaScript: 
```bash
tsc
```

5. Create a .env file in the root directory of the project and set the following variables:
```bash
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
```

Start the development server:
```bash
npm start
```

The server will start running on http://localhost:3000. You can access the application by opening this URL in your web browser.

## Documentation
![image](https://github.com/felipecomarques/compass-challenge-01/assets/57302703/b2e27c7c-1f0b-473d-b252-214a01fc3a26)

The API documentation is available through Swagger. You can access it by opening the following URL in your web browser after starting the development server: [http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

In the documentation, you can view request and response schemas, and even execute operations directly. It provides a convenient way to understand and interact with the API without the need for additional tools or clients.

## Developers

This project is a collaborative effort by the following developers:

- [Felipe Marques](https://github.com/felipecomarques)
- [Kelve Oliveira](https://github.com/kelve052)
- [Raimundo Kennedy](https://github.com/kennedy354)

