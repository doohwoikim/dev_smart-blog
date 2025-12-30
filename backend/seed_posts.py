from sqlmodel import Session, select
from database import engine, create_db_and_tables
from models import Post
from logic import analyze_text
import random
from datetime import datetime, timedelta

def seed_posts():
    create_db_and_tables()
    
    with Session(engine) as session:
        # Check if DB is empty
        statement = select(Post)
        results = session.exec(statement)
        if results.first() is not None:
            print("Database not empty, skipping seed.")
            return

        sample_posts = [
            {
                "title": "🚀 Welcome to Lumina",
                "content": """
# Hello, Developer!

Welcome to **Lumina**, your new intelligent development log.

## Features
1. **Markdown Support**: Write freely with standard markdown.
2. **AI Powered**: Automatic summarization and tagging.
3. **Liquid Glass Design**: Enjoy a modern, beautiful interface.

Start writing your first post by clicking the **"Write"** button in the navbar!
                """
            },
            {
                "title": "✨ Design Philosophy: Liquid Glass",
                "content": """
# The Aesthetics of Lumina

Lumina features a **Liquid Glass** design language.

## Key Elements
*   **Mesh Gradients**: Soft, flowing background colors.
*   **Glassmorphism**: Translucent cards with subtle borders (`backdrop-filter`).
*   **Depth**: Shadows and lighting effects to create 3D depth.

This ensures a pleasant writing experience even during long coding sessions.
                """
            },
            {
                "title": "🐍 Powered by FastAPI & Next.js",
                "content": """
# Tech Stack Overview

Lumina is built with:

*   **Backend**: Python FastAPI (High performance, Easy to use)
*   **Frontend**: Next.js 14 (App Router, Server Components)
*   **Database**: SQLite (Simple, File-based)

Run `./start.sh` to launch the entire stack effortlessly.
                """
            }
        ]

        print("Seeding 3 default posts...")
        for p_data in sample_posts:
            analysis = analyze_text(p_data["content"])
            created_at = datetime.now() - timedelta(minutes=random.randint(1, 60))

            post = Post(
                title=p_data["title"],
                content=p_data["content"],
                summary=analysis["summary"],
                tags=analysis["tags"],
                created_at=created_at
            )
            session.add(post)
        
        session.commit()
        print("Seed complete!")

if __name__ == "__main__":
    seed_posts()
