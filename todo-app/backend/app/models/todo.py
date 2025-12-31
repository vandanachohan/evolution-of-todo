from sqlmodel import SQLModel, Field, Column
from typing import Optional, List
from enum import Enum
import json


class Priority(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class TodoBase(SQLModel):
    title: str = Field(min_length=1, max_length=255)
    completed: bool = False
    priority: Priority = Priority.MEDIUM
    tags: Optional[str] = Field(default=None)  # Store as JSON string


class Todo(TodoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

    def set_tags(self, tags_list: List[str]):
        """Convert list of tags to JSON string for storage"""
        self.tags = json.dumps(tags_list)

    def get_tags(self) -> List[str]:
        """Convert stored JSON string back to list of tags"""
        if self.tags:
            return json.loads(self.tags)
        return []


class TodoCreate(TodoBase):
    pass


class TodoUpdate(SQLModel):
    title: Optional[str] = Field(default=None, min_length=1, max_length=255)
    completed: Optional[bool] = None
    priority: Optional[Priority] = None
    tags: Optional[List[str]] = None


class TodoRead(TodoBase):
    id: int