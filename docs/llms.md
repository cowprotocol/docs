---
sidebar_position: 5
sidebar_label: "🤖 LLMs.txt"
title: "LLMs.txt"
---

# LLMs.txt

CoW DAO documentation follows the [llmstxt.org](https://llmstxt.org/) standard, making it easy for AI tools and large language models to understand our documentation.

## Available files

| File | Description |
|------|-------------|
| [llms.txt](https://docs.cow.fi/llms.txt) | Structured overview with links to all documentation pages |
| [llms-full.txt](https://docs.cow.fi/llms-full.txt) | Complete documentation content in a single file |

## Usage

### Cursor

Use the `@Docs` feature to add the llms.txt URL as a documentation source. This gives Cursor accurate context about CoW Protocol, CoW AMM, and Governance when generating code suggestions.

See [Cursor docs](https://docs.cursor.com/context/@-symbols/@-docs) for more details.

### Windsurf

Reference the llms.txt file using `@` mentions or add it to your `.windsurfrules` configuration to enhance Windsurf's understanding of CoW DAO products.

See [Windsurf docs](https://docs.windsurf.com/windsurf/memories) for more details.

### Other tools

Any AI tool that supports the llms.txt standard can use these files. Point it to `https://docs.cow.fi/llms.txt` or `https://docs.cow.fi/llms-full.txt` depending on whether you need an overview or full content.
