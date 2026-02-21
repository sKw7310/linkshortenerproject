# Agent Instructions

This file provides instructions for AI coding assistants working on the Link Shortener project.

## ⚠️ CRITICAL: READ DOCUMENTATION FIRST

**🚨 DO NOT GENERATE ANY CODE WITHOUT READING THE RELEVANT DOCUMENTATION FILES FIRST! 🚨**

This is **NON-NEGOTIABLE**. Before writing, modifying, or suggesting ANY code:

1. **STOP** - Do not proceed with code generation
2. **UNDERSTAND** - Ensure you comprehend the patterns, standards, and requirements
3. **THEN CODE** - Only after reading the docs should you generate code

Failure to follow this process will result in code that doesn't follow project standards and will need to be rewritten.

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

- **Follow established patterns** - Match existing code style and structure
- **Be explicit about changes** - Explain what you're doing and why
- **Consider implications** - Think about security, performance, and maintainability
- **Ask when uncertain** - If requirements are unclear, ask for clarification
- **Test your changes** - Ensure code works as expected

### Workflow for Code Changes

1. **Identify the area** - Determine which part of the codebase you're modifying
2. **Understand the patterns** - Ensure you understand the standards and patterns
3. **Plan your changes** - Think through the implementation
4. **Write the code** - Now, and only now, generate the code
5. **Verify compliance** - Ensure your code follows the documented patterns

## 📚 Additional Context

This is a **link shortener application** that allows users to:

- Create shortened URLs
- Track analytics (clicks, referrers, geographic data)
- Manage their links with full CRUD operations
- View statistics and insights

Users must be authenticated (via Clerk) to create and manage links, but anyone can use shortened links to redirect to their destinations.

---
