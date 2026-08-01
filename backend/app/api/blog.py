from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.blog import BlogCreate, BlogResponse
from app.services.blog.blog_service import (
    create_blog,
    get_all_blogs,
    get_blog,
    update_blog,
    delete_blog
)

router = APIRouter(
    prefix="/blogs",
    tags=["Blogs"]
)


@router.post("/", response_model=BlogResponse)
def create(
    blog: BlogCreate,
    db: Session = Depends(get_db)
):
    return create_blog(blog, db)


@router.get("/", response_model=list[BlogResponse])
def all_blogs(
    db: Session = Depends(get_db)
):
    return get_all_blogs(db)


@router.get("/{blog_id}", response_model=BlogResponse)
def one_blog(
    blog_id: int,
    db: Session = Depends(get_db)
):
    return get_blog(blog_id, db)


@router.put("/{blog_id}", response_model=BlogResponse)
def update(
    blog_id: int,
    blog: BlogCreate,
    db: Session = Depends(get_db)
):
    return update_blog(blog_id, blog, db)


@router.delete("/{blog_id}")
def remove(
    blog_id: int,
    db: Session = Depends(get_db)
):
    return delete_blog(blog_id, db)