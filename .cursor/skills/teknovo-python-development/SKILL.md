---
name: teknovo-python-development
description: >-
  Develop, review, and run Python 3.12+ scripts, CLIs, and services on Teknovo
  workstations. Covers project layout, typing, venvs, FastAPI/Flask basics,
  and pytest. Use when working with Python, python3, .py files, pip, venv,
  pytest, FastAPI, Flask, or platform runtime scripts under .cursor/runtime/.
---

# Teknovo Python Development Skill

Use this skill when writing, reviewing, or running Python code on Teknovo workstations — especially `.cursor/runtime/` tooling, automation scripts, and standalone utilities.

**Note:** Teknovo V2 application backends are TypeScript (NestJS/Hono). Python is the platform runtime and automation layer, not the primary ERP stack.

---

## 1. Runtime & Commands

On this server, **`python3` is the correct interpreter** — `python` may not be on PATH.

```bash
python3 --version          # Expect 3.12+
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 -m pytest
python3 script.py
```

Prefer `python3 -m pip` and `python3 -m pytest` over bare `pip`/`pytest` to avoid wrong-environment installs.

### Teknovo platform bootstrap

Load skills and memory before non-trivial platform work:

```bash
python3 .cursor/runtime/load-skills.py --autoload
python3 .cursor/runtime/load-memory.py
python3 .cursor/runtime/load-skills.py --trigger "python pytest"
python3 .cursor/runtime/load-skills.py --validate
```

For feature work that touches the main stack, also load engineering bundles:

```bash
python3 .cursor/runtime/load-skills.py --bundle pre-implementation
```

---

## 2. Project Structure

### Minimal script or tool

```
tools/my-tool/
├── pyproject.toml      # or requirements.txt for simple scripts
├── README.md
├── src/
│   └── my_tool/
│       ├── __init__.py
│       ├── __main__.py # python3 -m my_tool
│       └── cli.py
└── tests/
    └── test_cli.py
```

### Conventions

- **Package name:** `snake_case` (import path matches folder name).
- **Module files:** `snake_case.py`; one primary responsibility per module.
- **Entry points:** `if __name__ == "__main__":` or `__main__.py` for `-m` execution.
- **Config:** environment variables or `.env` (never commit secrets); use `pathlib.Path` for file I/O.
- **Dependencies:** pin in `pyproject.toml` or `requirements.txt`; commit lockfile when the project uses one.

Avoid catch-all `utils.py` / `helpers.py` — name modules by domain (e.g. `registry_loader.py`, `yaml_parser.py`).

---

## 3. Python 3.12+ Best Practices

### Typing

- Annotate public function signatures and return types.
- Use built-in generics: `list[str]`, `dict[str, int]` (not `List`, `Dict` from typing unless needed).
- Prefer `X | None` over `Optional[X]`; use `TypedDict` or `@dataclass` for structured dicts.
- Run static checks when configured: `python3 -m mypy src/` or `python3 -m pyright`.

```python
from pathlib import Path

def load_text(path: Path, *, default: str = "") -> str:
    if not path.is_file():
        return default
    return path.read_text(encoding="utf-8")
```

### Style & linting

- Follow PEP 8; line length 88–100 (match project config).
- Prefer **ruff** for lint + format when available: `python3 -m ruff check .` / `ruff format .`.
- Use f-strings; avoid bare `except:` — catch specific exceptions.
- Use `logging` for scripts/services; reserve `print` for CLI user output.

### Modern patterns

- **Dataclasses** or **Pydantic v2** models for structured data (APIs, config).
- **Context managers** for files, DB connections, locks.
- **`pathlib.Path`** instead of `os.path` for filesystem work.
- **Explicit resource cleanup** — no reliance on `__del__`.

---

## 4. Virtual Environments

```bash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install --upgrade pip
python3 -m pip install -e ".[dev]"   # editable install when pyproject.toml exists
```

- Add `.venv/` to `.gitignore`.
- One venv per project root; do not commit site-packages.
- In CI/docs, always show `python3 -m venv` + `source .venv/bin/activate`.

---

## 5. CLI Scripts

Use **argparse** (stdlib) for simple tools; **click** or **typer** for richer CLIs.

```python
import argparse
from pathlib import Path

def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Process items")
    parser.add_argument("input", type=Path)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args(argv)
    # ... work
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
```

- Exit codes: `0` success, non-zero on failure; use `raise SystemExit(code)`.
- Support `--help`; validate inputs early with clear error messages to stderr.

---

## 6. Web Services (FastAPI / Flask)

Use for **internal tools, webhooks, or micro-utilities** — not Teknovo ERP APIs (those follow `teknovo-api-architect` / NestJS).

### FastAPI (preferred for new APIs)

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Tool API")

class ItemIn(BaseModel):
    name: str

@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}

@app.post("/items")
def create_item(body: ItemIn) -> dict[str, str]:
    if not body.name.strip():
        raise HTTPException(status_code=422, detail="name required")
    return {"name": body.name}
```

Run: `python3 -m uvicorn main:app --reload --host 127.0.0.1 --port 8000`

### Flask (legacy/simple routes)

- Use application factory or single module for small tools.
- Validate JSON bodies; return consistent JSON errors.
- Bind to `127.0.0.1` in dev unless explicitly exposing a service.

**Security:** Apply `teknovo-security` gates for anything handling auth, secrets, or production traffic.

---

## 7. Testing with pytest

```bash
python3 -m pytest                    # all tests
python3 -m pytest tests/test_foo.py -v
python3 -m pytest -k "test_load" --tb=short
python3 -m pytest --cov=src --cov-report=term-missing
```

### Conventions

- Test files: `tests/test_<module>.py` or `tests/<module>_test.py`.
- Functions: `test_<behavior>_<expected>()`.
- Use **fixtures** for temp dirs, sample files, and env setup.
- Mock external I/O (network, subprocess) — do not hit production services in unit tests.

```python
import pytest
from my_tool.cli import parse_args

def test_parse_args_requires_input():
    with pytest.raises(SystemExit):
        parse_args([])
```

For platform/runtime scripts, run the real CLI with `--validate` or `--help` as a smoke test when safe.

Align coverage goals with `teknovo-testing-architect` when Python code supports critical flows.

---

## 8. Dependencies & Packaging

**pyproject.toml** (preferred):

```toml
[project]
name = "my-tool"
requires-python = ">=3.12"
dependencies = ["pyyaml>=6.0"]

[project.optional-dependencies]
dev = ["pytest>=8.0", "ruff>=0.4", "mypy>=1.10"]

[project.scripts]
my-tool = "my_tool.cli:main"
```

Simple one-off scripts may use `requirements.txt` with pinned versions.

---

## 9. Integration Checklist

Before finishing Python work:

- [ ] All commands/docs use `python3`, not `python`
- [ ] Public APIs typed; no silent bare `except`
- [ ] Tests pass: `python3 -m pytest`
- [ ] No secrets in repo; env vars documented
- [ ] If touching `.cursor/runtime/`, run `python3 .cursor/runtime/load-skills.py --validate`
- [ ] If behavior affects Teknovo apps, cross-check `teknovo-backend-development` / `teknovo-api-architect` boundaries

---

## Related Skills

| Skill | When |
|-------|------|
| teknovo-testing-architect | Coverage matrices, test strategy |
| teknovo-backend-development | Main ERP backend (TypeScript) |
| teknovo-security | Auth, secrets, production exposure |
| superpowers-systematic-debugging | Failures, stack traces, evidence-based debug |
