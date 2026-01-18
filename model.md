```mermaid

erDiagram
    CATEGORY ||--o{ PRODUCT : "tiene"

    CATEGORY {
        INT id PK
        VARCHAR name "UNIQUE, NOT NULL"
        VARCHAR description
    }

    PRODUCT {
        INT id PK
        INT category_id FK
        VARCHAR name "NOT NULL"
        VARCHAR status "NOT NULL"
        DECIMAL price ">= 0"
        INT stock ">= 0"
        TEXT desc "NOT NULL"
    }

    CONTACT_MESSAGE {
        INT id PK
        VARCHAR name "NOT NULL"
        VARCHAR phone "NOT NULL"
        VARCHAR email "NOT NULL"
        VARCHAR reason "NOT NULL"
        TEXT message "NOT NULL"
        DATETIME created_at "DEFAULT now()"
    }

```
