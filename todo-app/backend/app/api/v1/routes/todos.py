from fastapi import APIRouter, Depends, HTTPException, Query
from typing import List, Optional
from sqlmodel import Session, select
from app.database.database import get_session
from app.models.todo import Todo,TodoCreate, TodoUpdate, TodoRead, Priority 


router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("/", response_model=List[TodoRead])
def get_todos(
    session: Session = Depends(get_session),
    completed: Optional[bool] = Query(None, description="Filter by completion status"),
    priority: Optional[Priority] = Query(None, description="Filter by priority"),
    search: Optional[str] = Query(None, description="Search in title"),
    sort: Optional[str] = Query("id", description="Sort by field (id, title, priority)"),
    order: Optional[str] = Query("asc", description="Sort order (asc, desc)")
):
    query = select(Todo)
    
    # Apply filters
    if completed is not None:
        query = query.where(Todo.completed == completed)
    
    if priority is not None:
        query = query.where(Todo.priority == priority)
    
    if search:
        query = query.where(Todo.title.contains(search))
    
    # Apply sorting
    if sort == "title":
        if order == "desc":
            query = query.order_by(Todo.title.desc())
        else:
            query = query.order_by(Todo.title.asc())
    elif sort == "priority":
        if order == "desc":
            query = query.order_by(Todo.priority.desc())
        else:
            query = query.order_by(Todo.priority.asc())
    else:  # Default to sorting by id
        if order == "desc":
            query = query.order_by(Todo.id.desc())
        else:
            query = query.order_by(Todo.id.asc())
    
    todos = session.exec(query).all()
    
    # Convert tags from JSON string to list for response
    for todo in todos:
        if todo.tags:
            import json
            todo.tags = json.loads(todo.tags)
        else:
            todo.tags = []
    
    return todos


@router.post("/", response_model=TodoRead)
def create_todo(todo: TodoCreate, session: Session = Depends(get_session)):
    # Convert tags list to JSON string for storage
    db_todo = Todo.model_validate(todo)
    if todo.tags:
        import json
        db_todo.set_tags(todo.tags)
    
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    
    # Convert tags back to list for response
    if db_todo.tags:
        import json
        db_todo.tags = json.loads(db_todo.tags)
    else:
        db_todo.tags = []
    
    return db_todo


@router.get("/{todo_id}", response_model=TodoRead)
def get_todo(todo_id: int, session: Session = Depends(get_session)):
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    # Convert tags from JSON string to list for response
    if todo.tags:
        import json
        todo.tags = json.loads(todo.tags)
    else:
        todo.tags = []
    
    return todo


@router.put("/{todo_id}", response_model=TodoRead)
def update_todo(todo_id: int, todo: TodoUpdate, session: Session = Depends(get_session)):
    db_todo = session.get(Todo, todo_id)
    if not db_todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    # Update fields
    todo_data = todo.model_dump(exclude_unset=True)
    if "tags" in todo_data and todo_data["tags"] is not None:
        # Convert tags list to JSON string for storage
        import json
        db_todo.set_tags(todo_data["tags"])
        del todo_data["tags"]  # Remove tags from update since we handle it separately
    
    for key, value in todo_data.items():
        setattr(db_todo, key, value)
    
    session.add(db_todo)
    session.commit()
    session.refresh(db_todo)
    
    # Convert tags back to list for response
    if db_todo.tags:
        import json
        db_todo.tags = json.loads(db_todo.tags)
    else:
        db_todo.tags = []
    
    return db_todo


@router.delete("/{todo_id}")
def delete_todo(todo_id: int, session: Session = Depends(get_session)):
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    session.delete(todo)
    session.commit()
    return {"message": "Todo deleted successfully"}


@router.patch("/{todo_id}/complete")
def toggle_todo_completion(todo_id: int, session: Session = Depends(get_session)):
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    
    todo.completed = not todo.completed
    session.add(todo)
    session.commit()
    session.refresh(todo)
    
    # Convert tags from JSON string to list for response
    if todo.tags:
        import json
        todo.tags = json.loads(todo.tags)
    else:
        todo.tags = []
    
    return todo