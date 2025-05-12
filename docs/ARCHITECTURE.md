# System Architecture and Data Flow

## System Architecture Diagram

```mermaid
graph TB
    subgraph "Frontend - Next.js"
        C[Client Browser]
        P[Pages/Components]
        AP[API Routes]
    end

    subgraph "Backend Services"
        NA[NextAuth.js]
        PR[Prisma ORM]
        QR[QR Code Generator]
        AI[Google Gemini AI]
    end

    subgraph "Database"
        PG[PostgreSQL]
    end

    C <--> P
    P <--> AP
    AP <--> NA
    AP <--> PR
    AP <--> QR
    AP <--> AI
    PR <--> PG

    style C fill:#f9f,stroke:#333,stroke-width:2px
    style PG fill:#b9f,stroke:#333,stroke-width:2px
    style AI fill:#ff9,stroke:#333,stroke-width:2px
```

## Data Flow Diagram

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Auth
    participant API
    participant DB
    participant QR
    participant AI

    %% Registration Flow
    User->>Frontend: Register with email/password
    Frontend->>API: POST /api/register
    API->>DB: Check if user exists
    DB-->>API: User status
    API->>Auth: Hash password
    API->>QR: Generate QR code
    API->>AI: Generate welcome message
    API->>DB: Save user data
    DB-->>API: Confirmation
    API-->>Frontend: Success response
    Frontend-->>User: Redirect to login

    %% Login Flow
    User->>Frontend: Login with credentials
    Frontend->>Auth: Authenticate
    Auth->>DB: Verify credentials
    DB-->>Auth: User data
    Auth-->>Frontend: Session token
    Frontend-->>User: Redirect to dashboard

    %% Dashboard Data Flow
    User->>Frontend: Access dashboard
    Frontend->>Auth: Verify session
    Auth-->>Frontend: Session valid
    Frontend->>API: GET /api/user
    API->>DB: Fetch user data
    DB-->>API: User data (QR & AI message)
    API-->>Frontend: User data
    Frontend-->>User: Display dashboard
```

## Component Architecture

```mermaid
graph LR
    subgraph "Pages"
        HP[Home Page]
        LP[Login Page]
        RP[Register Page]
        DP[Dashboard Page]
    end

    subgraph "Components"
        LF[LoginForm]
        RF[RegisterForm]
        NAP[NextAuthProvider]
        QRD[QR Display]
        AIM[AI Message]
    end

    subgraph "API Routes"
        AR["/api/register"]
        AL["/api/login"]
        AU["/api/user"]
    end

    subgraph "Services"
        PS[Prisma Service]
        AS[Auth Service]
        QS[QR Service]
        AIS[AI Service]
    end

    HP --> LP & RP
    LP --> LF
    RP --> RF
    DP --> QRD & AIM
    LF & RF --> NAP
    LF --> AL
    RF --> AR
    DP --> AU
    AR & AL & AU --> PS & AS
    AR --> QS & AIS

    style HP fill:#f9f,stroke:#333,stroke-width:2px
    style PS fill:#b9f,stroke:#333,stroke-width:2px
    style AS fill:#ff9,stroke:#333,stroke-width:2px
```

## Database Schema

```mermaid
erDiagram
    User {
        string id PK
        string email UK
        string password
        datetime createdAt
        datetime updatedAt
        string qrCode
        string aiGeneratedMessage
    }
```

## Technical Stack Details

### Frontend
- Next.js 14 (React Framework)
- TailwindCSS (Styling)
- NextAuth.js (Authentication)

### Backend
- Next.js API Routes
- Prisma ORM
- QRCode Library
- Google Gemini AI

### Database
- PostgreSQL 15

### Security Features
- Password Hashing (bcrypt)
- JWT Session Tokens
- CSRF Protection
- Input Validation
- Secure Headers

## Data Flow Descriptions

### Registration Process
1. User submits registration form with email and password
2. Server validates input and checks for existing users
3. Password is hashed using bcrypt
4. QR code is generated based on user email
5. AI generates a personalized welcome message
6. User data is saved to PostgreSQL database
7. Success response redirects user to login

### Authentication Process
1. User submits login credentials
2. NextAuth.js verifies credentials against database
3. On success, JWT session token is generated
4. User is redirected to dashboard
5. Session token is used for subsequent requests

### Dashboard Data Retrieval
1. Client verifies active session
2. Requests user data from API
3. Server validates session token
4. Retrieves user data, QR code, and AI message
5. Returns data to client for display

## Security Considerations

1. **Authentication**
   - Secure password hashing
   - JWT token-based sessions
   - Protected API routes

2. **Data Protection**
   - Input validation
   - SQL injection prevention (Prisma)
   - XSS protection
   - CSRF tokens

3. **API Security**
   - Rate limiting
   - Request validation
   - Secure headers
   - Error handling

4. **Database Security**
   - Encrypted connections
   - Limited access permissions
   - Prepared statements 