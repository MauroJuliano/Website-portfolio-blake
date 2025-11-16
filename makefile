# Makefile for interactive PR creation with auto-open

# Default target
help:
	@echo "Available commands:"
	@echo "  make pullrequest  - Create a pull request interactively and open it in the browser"

pullrequest:
	@echo "Creating pull request..."
	@read -p "Type (Feature/Bugfix/Refactor): " TYPE; \
	read -p "Jira Card (e.g., PAY-432): " CARD; \
	read -p "Pull request name: " NAME; \
	gh pr create --title "$$TITLE" --body-file .github/pull_request_template.md --web;
	echo "Pull request 'PF - $$TYPE: [$$CARD] $$NAME' created and opened in browser!"
