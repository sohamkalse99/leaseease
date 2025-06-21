# LeaseEase
Introducing LeaseEase - the ultimate solution for seamless room rentals. Say goodbye to the hassle of searching for a place to stay and hello to effortless leasing. 

## Cloning the Repository

```
git clone https://github.com/gandharkulkarni/LeaseEase.git
```

## Running the Frontend

1. Navigate to the frontend directory:
```
cd ui
```
2. Install dependencies:
```
npm install

```
3. Start the frontend server:
```
npm run start
```

The frontend will be accessible at http://localhost:3000


## Running the Backend

1. Navigate to the backend directory:
```
cd api
```
2. Install dependencies:
```
npm install
```
3. Add environmental variables in `local.ts` as specified below:
```
NAME: string,
PORT: number | string,
CORS_OPTIONS: any,
MONGO_URL: string,
BACKEND_URL: string,
FRONTEND_URL: string,
JWT_KEY: string,
CLAUD_KEY: string
```
4. Build the backend:
```
npm run build
```
5. Start the backend server:
```
npm run dev
```
The backend will be running on http://localhost:5000