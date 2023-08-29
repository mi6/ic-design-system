#!/bin/bash
# This script will check for, and reject, non-github email addresses

# Get user email used in git config
EMAIL=$(git config user.email)

# Regex for a private github email address
MATCH='[A-Za-z0-9._%+-]+@users\.noreply\.github\.com$'

echo "Checking git config user.email"
if [[ $EMAIL =~ $MATCH ]]; then
    echo "user.email is a GitHub user email. proceeding."
    exit 0
else
    echo "Your email ($EMAIL) is not a GitHub user email. Please consult the Git Commit heading in CONTRIBUTING.md for information on how to correct this."
    exit 1
fi