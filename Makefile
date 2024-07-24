.DEFAULT_GOAL := build-dev

.PHONY: start-dev
start-dev:
	docker compose up -d

.PHONY: stop-dev
stop-dev:
	docker compose stop

.PHONY: build-dev
build-dev:
	docker compose up --build -d

.PHONY: down-dev
down-dev:
	docker compose down
