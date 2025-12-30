# Lumina - Intelligent Dev Blog 🌌

[English](#english) | [한국어](#korean)

---

<br>

<a id="english"></a>
## English

**Lumina** is a smart developer log application powered by AI. It features a sophisticated "Liquid Glass" design and automatically summarizes and tags your markdown posts using a Python backend.

### ✨ Features
- **✍️ Markdown Support**: Write detailed tech logs with rich formatting.
- **🧠 AI Analysis**: Automatically generates summaries and extracts tags from your content.
- **🎨 Liquid Glass Design**: Modern UI with mesh gradients and glassmorphism effects.
- **🌓 Dark Mode**: Fully responsive light and dark themes.
- **🚀 Monorepo**: Integrated Frontend and Backend workflow.

### 🛠️ Tech Stack

**Frontend**
- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (with `@tailwindcss/typography`)
- **Language**: TypeScript
- **HTTP Client**: `fetch` (Server), `axios` (Client)

**Backend**
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: SQLite with [SQLModel](https://sqlmodel.tiangolo.com/) (ORM)
- **AI Logic**: Custom Python implementation (Standard Library `collections`, `re`)

### 🚀 How to Run

**Prerequisites**: Node.js v18+, Python v3.8+

1. **Clone & Navigate**
    ```bash
    cd lumina
    ```

2. **Run the Application**
    ```bash
    chmod +x start.sh
    ./start.sh
    ```
    > The script automatically creates a Python virtual environment, installs dependencies, and starts both Backend (Port 8000) and Frontend (Port 3000).

3. **Access**
    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

**Tests**: To seed test data:
```bash
cd backend
../backend/venv/bin/python seed_posts.py
```

---

<br>

<a id="korean"></a>
## 한국어 (Korean)

**Lumina**는 AI 기반의 스마트 개발자 로그 애플리케이션입니다. 세련된 'Liquid Glass' 디자인을 갖추고 있으며, Python 백엔드를 통해 마크다운 게시글을 자동으로 요약하고 태깅합니다.

### ✨ 주요 기능
- **✍️ 마크다운 지원**: 풍부한 서식으로 개발 일지를 작성할 수 있습니다.
- **🧠 AI 분석**: 작성된 콘텐츠를 분석하여 자동으로 요약을 생성하고 태그를 추출합니다.
- **🎨 Liquid Glass 디자인**: 메쉬 그라디언트와 글래스모피즘(Glassmorphism) 효과를 적용한 현대적인 UI입니다.
- **🌓 다크 모드**: 라이트 모드와 다크 모드를 모두 완벽하게 지원합니다.
- **🚀 모노레포**: 프론트엔드와 백엔드가 하나의 저장소에 통합되어 관리됩니다.

### 🛠️ 기술 스택

**프론트엔드**
- **프레임워크**: [Next.js 14+](https://nextjs.org/) (App Router)
- **스타일링**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/typography`)
- **언어**: TypeScript
- **HTTP 통신**: `fetch` (서버), `axios` (클라이언트)

**백엔드**
- **프레임워크**: [FastAPI](https://fastapi.tiangolo.com/)
- **데이터베이스**: SQLite + [SQLModel](https://sqlmodel.tiangolo.com/) (ORM)
- **AI 로직**: Python 표준 라이브러리(`collections`, `re`)를 활용한 자체 구현

### 🚀 실행 방법

**준비 사항**: Node.js v18 이상, Python v3.8 이상

1. **프로젝트 이동**
    ```bash
    cd lumina
    ```

2. **애플리케이션 실행**
    ```bash
    chmod +x start.sh
    ./start.sh
    ```
    > 스크립트가 자동으로 Python 가상 환경을 생성하고 의존성을 설치한 후, 백엔드(8000번 포트)와 프론트엔드(3000번 포트)를 동시에 실행합니다.

3. **접속**
    - **프론트엔드**: [http://localhost:3000](http://localhost:3000)
    - **백엔드 API 문서**: [http://localhost:8000/docs](http://localhost:8000/docs)

**테스트 데이터**: 샘플 게시글 추가:
```bash
cd backend
../backend/venv/bin/python seed_posts.py
```

---