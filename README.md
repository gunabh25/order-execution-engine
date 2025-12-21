# 🚀 Order Execution Engine (Backend Assignment)

A backend system that executes market orders with automatic DEX routing and real-time WebSocket updates.  
Built to demonstrate asynchronous processing, queue-based execution, and scalable backend architecture.

---

## 📌 Problem Summary

The goal of this project is to design an **order execution engine** that:

- Accepts orders via HTTP
- Executes them asynchronously
- Routes orders to the best DEX (Raydium / Meteora)
- Streams real-time execution status via WebSockets
- Persists execution state for observability and recovery

This implementation uses a **mock DEX layer** with realistic delays and price variance, while keeping the architecture compatible with real Solana devnet execution.

---

## 🧠 Design Decisions

### Chosen Order Type: **Market Order**
- Simplest to reason about for a first execution engine
- Focuses on routing, execution, and real-time updates
- Avoids unnecessary price-watching complexity

**Extensibility:**  
Limit and sniper orders can be added by introducing new execution strategies while reusing the same queue, router, worker, and WebSocket infrastructure.

---

## 🏗️ Architecture Overview

Client
│
├── HTTP (Order Submission)
│ ↓
│ Fastify API
│ ↓
│ BullMQ Queue ─────▶ Worker
│ │
│ ├── DEX Router (Raydium / Meteora)
│ ├── Execution + Retry Logic
│ └── PostgreSQL Persistence
│
└── WebSocket (Live Updates)
↑
Redis Pub/Sub

## 🗂️ Project Structure

order-execution-engine/
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── README.md
├── postman_collection.json
└── src/
├── server.ts # App bootstrap
├── app.ts # Fastify setup
├── config/
│ ├── env.ts # Environment config
│ ├── redis.ts # Redis connection
│ └── postgres.ts # PostgreSQL connection
├── modules/
│ ├── orders/
│ │ ├── order.controller.ts
│ │ ├── order.ws.ts
│ │ ├── order.schema.ts
│ │ └── order.service.ts
│ ├── router/
│ │ ├── dex.router.ts
│ │ └── mock.dex.ts
│ └── queue/
│ ├── order.queue.ts
│ └── order.worker.ts
├── realtime/
│ └── ws.gateway.ts
├── utils/
│ ├── sleep.ts
│ ├── retry.ts
│ └── logger.ts


## 🔁 Order Lifecycle

Each order goes through the following states:

1. **pending** – Order received and queued  
2. **routing** – Comparing Raydium and Meteora quotes  
3. **building** – Preparing transaction  
4. **submitted** – Sent for execution  
5. **confirmed** – Execution successful (txHash returned)  
6. **failed** – Execution failed after retries

All states are streamed to the client in real time via WebSockets.

---

## 🌐 API Endpoints

### Create Order
POST /api/orders/execute

**Request Body**
```json
{
  "tokenIn": "SOL",
  "tokenOut": "USDC",
  "amount": 1
}
Response

{
  "orderId": "uuid"
}
Get Order Status
GET /api/orders/:orderId
Returns persisted execution state from PostgreSQL.

WebSocket (Live Updates)
ws://localhost:3000/api/orders/execute?orderId=<ORDER_ID>
Streams lifecycle updates for the given order.

Health Check
GET /health

Returns Redis and PostgreSQL connectivity status.

⚙️ Tech Stack
Node.js + TypeScript

Fastify (HTTP + WebSocket)

BullMQ + Redis (Queue + Pub/Sub)

PostgreSQL (Persistence)

Docker (Local infra)

Postman (API testing)

▶️ Running the Project
1. Start Infrastructure
docker-compose up -d

2. Start API Server
npm run dev

3. Start Worker
npm run worker

🧪 Testing
Unit & integration tests included for:

DEX routing logic

Queue behavior

WebSocket lifecycle

Run tests:

bash

npm test
📡 Mock DEX Implementation
Simulates Raydium & Meteora quotes

Adds realistic 2–3s execution delay

Introduces 2–5% price variance

Easily replaceable with real Solana devnet SDKs

🚀 Deployment Notes
Designed to run on free-tier hosting

Stateless API layer

Horizontally scalable workers

Redis-backed real-time messaging

🎯 Key Takeaways
Non-blocking, async-first design

Real-time feedback without polling

Clean separation of concerns

Production-ready patterns

Easily extensible execution engine

📹 Demo
Screen-recorded walkthrough included

Demonstrates:

Order submission

Concurrent execution

Live WebSocket updates

DEX routing decisions

Queue processing