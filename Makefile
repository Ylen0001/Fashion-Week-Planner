.PHONY: dev install stop

dev:
	@echo "🚀 Starting fullstack app..."
	npx concurrently \
		--names "CLIENT,SERVER" \
		--prefix-colors "magenta,cyan" \
		"cd client && npm run dev" \
		"cd server && node index.js"

install:
	@echo "📦 Installing dependencies..."
	cd client && npm install
	cd server && npm install

stop:
	@echo "🛑 Stopping all node processes..."
	@pkill -f node || true