from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.gallery import Gallery
from app.schemas.gallery import GalleryCreate


def create_gallery(item: GalleryCreate, db: Session):

    new_item = Gallery(
        title=item.title,
        media_type=item.media_type,
        category=item.category,
        event_name=item.event_name,
        year=item.year,
        media_url=item.media_url,
        description=item.description
    )

    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item


def get_gallery(db: Session):
    return db.query(Gallery).order_by(Gallery.created_at.desc()).all()


def get_photos(db: Session):
    return db.query(Gallery).filter(
        Gallery.media_type == "Photo"
    ).all()


def get_videos(db: Session):
    return db.query(Gallery).filter(
        Gallery.media_type == "Video"
    ).all()


def get_event_gallery(event_name: str, db: Session):
    return db.query(Gallery).filter(
        Gallery.event_name.ilike(f"%{event_name}%")
    ).all()


def update_gallery(
    gallery_id: int,
    item: GalleryCreate,
    db: Session
):

    gallery = db.query(Gallery).filter(
        Gallery.id == gallery_id
    ).first()

    if not gallery:
        raise HTTPException(
            status_code=404,
            detail="Gallery item not found."
        )

    gallery.title = item.title
    gallery.media_type = item.media_type
    gallery.category = item.category
    gallery.event_name = item.event_name
    gallery.year = item.year
    gallery.media_url = item.media_url
    gallery.description = item.description

    db.commit()
    db.refresh(gallery)

    return gallery


def delete_gallery(gallery_id: int, db: Session):

    gallery = db.query(Gallery).filter(
        Gallery.id == gallery_id
    ).first()

    if not gallery:
        raise HTTPException(
            status_code=404,
            detail="Gallery item not found."
        )

    db.delete(gallery)
    db.commit()

    return {
        "message": "Gallery item deleted successfully."
    }