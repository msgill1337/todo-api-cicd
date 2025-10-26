# Multi-stage build
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY src/package*.json ./

# Install ALL dependencies (including devDependencies for testing)
RUN npm install

# Copy source
COPY src/ .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy everything from build stage
COPY --from=build /app .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app

USER nodejs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "app.js"]