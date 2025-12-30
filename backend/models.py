from typing import Optional
from datetime import datetime
from sqlmodel import Field, SQLModel

class Post(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    content: str
    summary: Optional[str] = None
    tags: str  # Comma-separated string
    created_at: datetime = Field(default_factory=datetime.now)
