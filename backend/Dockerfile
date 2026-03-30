# Dockerfile for Google Cloud Platform Deployment

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy application code
COPY server.js .

# Copy database schema (for reference)
COPY schema.sql ./

# Create app directories if they don't exist
RUN mkdir -p config middleware routes

# Copy config and middleware
COPY config/ ./config/
COPY middleware/ ./middleware/
COPY routes/ ./routes/

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["node", "server.js"]
