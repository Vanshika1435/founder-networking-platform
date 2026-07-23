from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db

from app.schemas.gallery import (
    GalleryCreate,
    GalleryResponse
)

from app.services.gallery.gallery_service import (
    create_gallery,
    get_gallery,
    get_photos,
    get_videos,
    get_event_gallery,
    update_gallery,
    delete_gallery
)

from app.core.dependencies import require_admin

router = APIRouter(
    prefix="/gallery",
    tags=["Gallery"]
)


@router.post(
    "/",
    response_model=GalleryResponse
)
def create(
    item: GalleryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return create_gallery(item, db)


@router.get(
    "/",
    response_model=list[GalleryResponse]
)
def all_gallery(
    db: Session = Depends(get_db)
):
    return get_gallery(db)


@router.get(
    "/photos",
    response_model=list[GalleryResponse]
)
def photos(
    db: Session = Depends(get_db)
):
    return get_photos(db)


@router.get(
    "/videos",
    response_model=list[GalleryResponse]
)
def videos(
    db: Session = Depends(get_db)
):
    return get_videos(db)


@router.get(
    "/event/{event_name}",
    response_model=list[GalleryResponse]
)
def event_gallery(
    event_name: str,
    db: Session = Depends(get_db)
):
    return get_event_gallery(event_name, db)


@router.put(
    "/{gallery_id}",
    response_model=GalleryResponse
)
def update(
    gallery_id: int,
    item: GalleryCreate,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return update_gallery(gallery_id, item, db)


@router.delete("/{gallery_id}")
def delete(
    gallery_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(require_admin)
):
    return delete_gallery(gallery_id, db)