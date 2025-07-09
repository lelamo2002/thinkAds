# Dockerfile

# 1. Base Stage: Install dependencies
FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# 2. Build Stage: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Environment variables for Next.js build
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# 3. Production Stage: Create the final image
FROM node:20-alpine AS runner
WORKDIR /app

# Environment variables for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose the port the app runs on
EXPOSE 3000

# Set the user to run the app
USER nextjs

# Start the app
CMD ["node", "server.js"] 