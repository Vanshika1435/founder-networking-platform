from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.blog import Blog
from app.schemas.blog import BlogCreate


def create_blog(blog: BlogCreate, db: Session):

    new_blog = Blog(
        title=blog.title,
        content=blog.content,
        author=blog.author,
        image=blog.image
    )

    db.add(new_blog)
    db.commit()
    db.refresh(new_blog)

    return new_blog


def get_all_blogs(db: Session):

    return (
        db.query(Blog)
        .order_by(Blog.created_at.desc())
        .all()
    )


def get_blog(blog_id: int, db: Session):

    blog = (
        db.query(Blog)
        .filter(Blog.id == blog_id)
        .first()
    )

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found."
        )

    return blog


def update_blog(
    blog_id: int,
    updated_blog: BlogCreate,
    db: Session
):

    blog = (
        db.query(Blog)
        .filter(Blog.id == blog_id)
        .first()
    )

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found."
        )

    blog.title = updated_blog.title
    blog.content = updated_blog.content
    blog.author = updated_blog.author
    blog.image = updated_blog.image

    db.commit()
    db.refresh(blog)

    return blog


def delete_blog(blog_id: int, db: Session):

    blog = (
        db.query(Blog)
        .filter(Blog.id == blog_id)
        .first()
    )

    if not blog:
        raise HTTPException(
            status_code=404,
            detail="Blog not found."
        )

    db.delete(blog)
    db.commit()

    return {
        "message": "Blog deleted successfully."
    }