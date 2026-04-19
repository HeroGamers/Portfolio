default: run

run: pre-commit
    npm run dev

pre-commit: format lint check

format:
    npm run format

lint:
    npm run lint

check:
    npm run check
