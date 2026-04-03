FROM oven/bun:latest

WORKDIR /app
COPY .output /app/.output

EXPOSE 4000

# make sure Bun listens on all interfaces
CMD ["bun", ".output/server/index.mjs", "--host", "0.0.0.0", "--port", "4000"]
