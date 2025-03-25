#!/bin/bash

# This script deploys database migrations to the production Supabase instance

echo "Deploying database migrations to production..."

# Make sure the Supabase CLI is installed
if ! command -v supabase &> /dev/null
then
    echo "Supabase CLI not found. Installing..."
    npm install -g supabase
fi

# Link to the production project
echo "Linking to production project..."
supabase link --project-ref hmmmztyrqhxjovingweq

# Push the migrations
echo "Pushing database migrations..."
supabase db push

echo "Deployment complete!" 