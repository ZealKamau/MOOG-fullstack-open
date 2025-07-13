# Single-Page App (SPA) Diagram

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    Note right of User: User navigates to https://studies.cs.helsinki.fi/exampleapp/spa

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate Server
    Server-->>Browser: HTML document (SPA)
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate Server
    Server-->>Browser: CSS file
    deactivate Server

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate Server
    Server-->>Browser: JavaScript file (SPA logic)
    deactivate Server

    Note right of Browser: Browser executes spa.js, which fetches JSON data

    Browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate Server
    Server-->>Browser: JSON data (notes)
    deactivate Server

    Note right of Browser: Browser renders notes dynamically using JavaScript
```