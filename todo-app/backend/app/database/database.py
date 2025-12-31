 # app/database/database.py
from sqlmodel import create_engine, Session, SQLModel
from sqlalchemy.pool import QueuePool, StaticPool

def get_engine():
    # Lazy import to avoid circular imports
    from ..config.settings import settings

    if not settings.DATABASE_URL:
        raise ValueError("DATABASE_URL is not set in your environment or .env file.")

    if settings.DATABASE_URL.startswith("sqlite"):
        # SQLite engine
        return create_engine(
            settings.DATABASE_URL,
            echo=True,
            connect_args={"check_same_thread": False},
            poolclass=StaticPool,
        )
    else:
        # PostgreSQL or other database engine
        return create_engine(
            settings.DATABASE_URL,
            echo=True,
            poolclass=QueuePool,
            pool_size=5,
            max_overflow=10,
            pool_pre_ping=True,
            pool_recycle=300,
        )

# Initialize engine
engine = get_engine()

def get_session():
    from ..config.settings import settings
    with Session(engine) as session:
        yield session

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# -----------------------------
# Make this file runnable
# -----------------------------
if __name__ == "__main__":
    create_db_and_tables()
    print("✅ Database and tables created successfully!")
