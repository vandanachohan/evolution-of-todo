from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class Priority(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class TodoBase(BaseModel):
    title: str
    completed: bool = False
    priority: Priority = Priority.MEDIUM
    tags: Optional[List[str]] = None


class TodoCreate(TodoBase):
    pass


class TodoUpdate(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None
    priority: Optional[Priority] = None
    tags: Optional[List[str]] = None


class TodoRead(TodoBase):
    id: int