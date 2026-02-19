# Agent Instructions

This file provides instructions for AI coding assistants working on the Link Shortener project.

## ⚠️ CRITICAL: READ DOCUMENTATION FIRST

**🚨 DO NOT GENERATE ANY CODE WITHOUT READING THE RELEVANT DOCUMENTATION FILES FIRST! 🚨**

This is **NON-NEGOTIABLE**. Before writing, modifying, or suggesting ANY code:

1. **STOP** - Do not proceed with code generation
2. **READ** - Open and thoroughly read the relevant documentation file(s) from `/docs`
3. **UNDERSTAND** - Ensure you comprehend the patterns, standards, and requirements
4. **THEN CODE** - Only after reading the docs should you generate code

Failure to follow this process will result in code that doesn't follow project standards and will need to be rewritten.

## 📖 Documentation

All coding standards, patterns, and best practices are documented in the `/docs` directory. **YOU MUST** refer to the relevant .md file BEFORE generating any code:

- **[Authentication](./docs/02-authentication.md)** - Clerk integration, protected routes, sign in/up modals
- **[UI Components](./docs/03-ui-components.md)** - shadcn/ui usage, component standards, theming


## 🎯 Core Principles

When contributing to this project, always:

1. **Follow TypeScript strict mode** - No `any` types, explicit typing for public APIs
2. **Use Server Components by default** - Only use Client Components when necessary
3. **Authenticate and authorize** - Always check user permissions before operations
4. **Handle errors gracefully** - Provide user-friendly messages and log details
5. **Validate all input** - Use Zod schemas for validation
6. **Write tests** - Cover critical functionality with tests
7. **Maintain consistency** - Follow established patterns in the codebase
8. **Think security-first** - Validate, sanitize, and never expose sensitive data

## 🔧 Tech Stack

- **Next.js 16** with App Router
- **TypeScript 5** with strict mode
- **Drizzle ORM** with PostgreSQL (Neon)
- **Clerk** for authentication
- **Tailwind CSS v4** + **shadcn/ui** for UI
- **Lucide React** for icons

## � IMPORTANT: No middleware.ts

**⚠️ DO NOT USE middleware.ts - It is deprecated in Next.js 16+**

This project uses **Next.js 16**, which has deprecated the traditional `middleware.ts` file approach. Instead:

- **NEVER create or use `middleware.ts`** - This file should not exist in the project
- **USE `proxy.ts` instead** - All middleware logic and request handling should be implemented in `proxy.ts`
- The `proxy.ts` file handles authentication checks, redirects, and other middleware functionality

If you need to add middleware logic, modify the existing `proxy.ts` file following the established patterns within it.

## �📝 Before You Start

**MANDATORY STEPS - Do not skip these:**

1. **READ DOCUMENTATION FIRST** - This is not optional. Identify which area you're working on and read the corresponding documentation file(s) in `/docs` BEFORE writing any code
2. Read the [Project Overview](./docs/01-overview.md) to understand the architecture
3. Review ALL relevant documentation files for the area you're working on
4. Check existing code for established patterns
5. Ensure you understand authentication and authorization requirements
6. Consider error handling and edge cases

**Remember: Documentation → Understanding → Code. Never skip step 1.**

## ⚡ Quick Commands

```bash
# Development
npm run dev

# Database
npx drizzle-kit generate  # Generate migrations
npx drizzle-kit push      # Apply migrations

# Testing
npm test                  # Run unit tests
npm run test:e2e         # Run E2E tests

# Linting
npm run lint
```

## 🤖 AI Assistant Guidelines

As an AI assistant working on this project:

- **🚨 CRITICAL: Consult documentation BEFORE any code generation** - Check the `/docs` folder and read the entire relevant documentation file(s) before writing a single line of code. This is mandatory, not a suggestion.
- **Follow established patterns** - Match existing code style and structure
- **Be explicit about changes** - Explain what you're doing and why
- **Consider implications** - Think about security, performance, and maintainability
- **Ask when uncertain** - If requirements are unclear, ask for clarification
- **Test your changes** - Ensure code works as expected

### Workflow for Code Changes

1. **Identify the area** - Determine which part of the codebase you're modifying
2. **Read the docs** - Open and read the relevant `/docs/*.md` file(s) completely
3. **Understand the patterns** - Ensure you understand the standards and patterns
4. **Plan your changes** - Think through the implementation
5. **Write the code** - Now, and only now, generate the code
6. **Verify compliance** - Ensure your code follows the documented patterns

## 📚 Additional Context

This is a **link shortener application** that allows users to:
- Create shortened URLs
- Track analytics (clicks, referrers, geographic data)
- Manage their links with full CRUD operations
- View statistics and insights

Users must be authenticated (via Clerk) to create and manage links, but anyone can use shortened links to redirect to their destinations.

---

**🔴 FINAL REMINDER: Read the documentation in `/docs` BEFORE generating any code. This is not optional.**

For detailed information on any topic, please refer to the specific documentation file in the `/docs` directory.
