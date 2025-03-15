#!/bin/bash

# Define paths
APP_DIR="/root/myapp"
PUBLIC_DIR="$APP_DIR/public"
IMAGES_DIR="$PUBLIC_DIR/images"

echo "Setting up image directories and permissions..."

# Create image directories
mkdir -p "$IMAGES_DIR/logos"
mkdir -p "$IMAGES_DIR/branding"
mkdir -p "$IMAGES_DIR/portfolio/fliers"
mkdir -p "$IMAGES_DIR/portfolio/websites"

# Set ownership to root since Node.js runs as root
chown -R root:root "$IMAGES_DIR"

# Set directory permissions to 755
find "$IMAGES_DIR" -type d -exec chmod 755 {} \;

# Set file permissions to 644
find "$IMAGES_DIR" -type f -exec chmod 644 {} \;

# Ensure nginx can read everything
chmod -R o+r "$IMAGES_DIR"

echo "Done! Directories created and permissions set."