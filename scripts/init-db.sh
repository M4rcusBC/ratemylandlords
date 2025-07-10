#!/bin/bash

# Database initialization script for RateMyLandlords
# This script sets up the PostgreSQL database and runs migrations

echo "🏠 Initializing RateMyLandlords Database..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL environment variable is not set"
    echo "Please set DATABASE_URL to your PostgreSQL connection string"
    echo "Example: DATABASE_URL='postgresql://username:password@localhost:5432/ratemylandlords'"
    exit 1
fi

echo "📊 DATABASE_URL is set"

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🚀 Running database migrations..."
npx prisma db push

# Optional: Seed the database with sample data
if [ "$1" = "--seed" ]; then
    echo "🌱 Seeding database with sample data..."
    npm run seed
fi

echo "✅ Database initialization complete!"
echo "🎉 RateMyLandlords is ready to go!"