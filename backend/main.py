from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from database import create_db_and_tables, engine
from models import Post
from logic import analyze_text
from contextlib import asynccontextmanager
from seed_posts import seed_posts

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    # Startup: Seed posts if needed
    try:
        seed_posts()
        print("Startup seed check completed.")
    except Exception as e:
        print(f"Startup seed failed: {e}")
    yield

app = FastAPI(lifespan=lifespan)

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_session():
    with Session(engine) as session:
        yield session

@app.post("/posts", response_model=Post)
def create_post(post: Post, session: Session = Depends(get_session)):
    # Run analysis
    analysis = analyze_text(post.content)
    post.summary = analysis["summary"]
    post.tags = analysis["tags"]
    
    session.add(post)
    session.commit()
    session.refresh(post)
    return post

@app.get("/posts", response_model=list[Post])
def read_posts(session: Session = Depends(get_session)):
    posts = session.exec(select(Post).order_by(Post.created_at.desc())).all()
    return posts

@app.get("/posts/{post_id}", response_model=Post)
def read_post(post_id: int, session: Session = Depends(get_session)):
    post = session.get(Post, post_id)
    return post

@app.delete("/posts/{post_id}")
def delete_post(post_id: int, session: Session = Depends(get_session)):
    post = session.get(Post, post_id)
    if post:
        session.delete(post)
        session.commit()
        return {"ok": True}
    return {"ok": False}

@app.put("/posts/{post_id}", response_model=Post)
def update_post(post_id: int, post_data: Post, session: Session = Depends(get_session)):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    post.title = post_data.title
    post.content = post_data.content
    
    # Re-run analysis
    analysis = analyze_text(post.content)
    post.summary = analysis["summary"]
    post.tags = analysis["tags"]
    
    session.add(post)
    session.commit()
    session.refresh(post)
    return post
