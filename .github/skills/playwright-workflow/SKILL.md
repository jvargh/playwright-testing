---
name: playwright-workflow
description: Complete end-to-end workflow for planning and generating Playwright tests. Uses specialized agents to create comprehensive test plans from requirements and generate robust test code from plans. Ideal for teams implementing systematic test automation.
---

# Playwright Testing Workflow

This skill provides a complete end-to-end workflow for creating comprehensive Playwright tests, from initial planning through code generation. It leverages specialized agents and proven patterns to ensure thorough test coverage and maintainable test code.

## When to Use This Skill

Use this skill when you need to:
- Create comprehensive test plans for web applications
- Generate Playwright test code from feature requirements
- Establish systematic test automation for new projects
- Standardize testing practices across teams
- Transform manual test scenarios into automated Playwright tests

## Workflow Overview

The workflow consists of two main phases:

1. **Planning Phase**: Analyze requirements and create detailed test plans
2. **Generation Phase**: Convert test plans into executable Playwright code

## Quick Start

### 1. Planning Phase

Start by creating a comprehensive test plan from your feature requirements:

```markdown
Create a test plan for [describe your feature/application].
Use the playwright-planner agent to analyze the interface and create detailed scenarios.
```

The planner will:
- Navigate and explore your web application
- Identify all interactive elements and user flows
- Create detailed test scenarios with step-by-step instructions
- Cover happy paths, edge cases, and error states
- Save a structured test plan document

### 2. Generation Phase

Once you have an approved test plan, generate the test code:

```markdown
Generate Playwright tests from the approved test plan at [plan location].
Use the playwright-generator agent to create individual test files.
```

The generator will:
- Review each scenario in the test plan
- Navigate the application to validate selectors
- Generate complete TypeScript test files
- Create reusable page objects and utilities
- Follow Playwright best practices and conventions

## Detailed Workflow

### Phase 1: Test Planning

**Agent**: `playwright-planner`

**Input**: Feature requirements, user stories, or application URLs

**Process**:
1. Set up browser navigation using Playwright MCP tools
2. Thoroughly explore the web interface
3. Map primary user journeys and critical paths
4. Identify edge cases and error conditions
5. Structure scenarios with clear success criteria

**Output**: Structured test plan with:
- Executive summary of tested functionality
- Individual scenarios as numbered steps
- Expected results for verification
- Proposed file names for implementation

**Best Practices**:
- Always assume fresh/blank starting state
- Write steps specific enough for any tester to follow
- Include negative testing scenarios
- Ensure scenarios are independent and can run in any order

See [references/planner-guide.md](references/planner-guide.md) for detailed planner instructions.

### Phase 2: Test Generation

**Agent**: `playwright-generator`

**Input**: Approved test plan with detailed scenarios

**Process**:
1. Review test plan scenarios
2. Execute each step manually in browser to understand interactions
3. Validate selectors using Playwright MCP server
4. Generate complete test files with proper structure
5. Create reusable utilities and page objects

**Output**: Production-ready Playwright tests:
- Individual test files per scenario
- TypeScript with @playwright/test framework
- Proper test organization with describe/test blocks
- Realistic wait/assertion times
- Metadata tags for reporting

**Best Practices**:
- Never assume selectors—always validate through MCP
- Follow existing project conventions
- Create page objects for common interactions
- Use test.step() for clear test organization
- Include descriptive comments before each step

See [references/generator-guide.md](references/generator-guide.md) for detailed generator instructions.

## Team Adoption

For teams adopting this workflow:

### Setup Requirements
- Playwright installed and configured
- Access to target web application
- Basic understanding of TypeScript/JavaScript

### Recommended Structure
```
tests/
├── plans/              # Test plans from planning phase
├── page-objects/       # Reusable page interaction classes
├── utilities/          # Helper functions and test utilities
└── specs/             # Generated test files
    ├── feature-1/
    ├── feature-2/
    └── ...
```

### Integration Tips
1. **Start Small**: Begin with critical user journeys
2. **Iterate**: Refine plans based on implementation feedback
3. **Standardize**: Use consistent naming and organization patterns
4. **Review**: Have team members review both plans and generated code
5. **Maintain**: Update tests as application functionality evolves

## Advanced Usage

### Custom Agents

The workflow can be extended with custom agents for specific needs:
- **Domain-specific validators**: For specialized application types
- **Performance testers**: For load and performance scenarios
- **Accessibility checkers**: For WCAG compliance testing

### Integration Patterns

- **CI/CD Integration**: Automate test generation in build pipelines
- **Documentation Sync**: Link test plans to feature documentation
- **Issue Tracking**: Connect scenarios to bug reports and feature requests

## Troubleshooting

**Common Issues**:
- **Selector failures**: Use MCP tools to validate elements exist
- **Timing issues**: Add proper waits for dynamic content
- **Flaky tests**: Review generated assertions and add stability checks

**Getting Help**:
- Review the reference guides for detailed agent instructions
- Check existing test patterns in your project
- Use MCP browser tools to debug element interactions

## Reference Materials

- **[Planner Guide](references/planner-guide.md)**: Complete instructions for the playwright-planner agent
- **[Generator Guide](references/generator-guide.md)**: Complete instructions for the playwright-generator agent
- **[Prompt Templates](references/prompt-templates.md)**: Ready-to-use prompts for both phases
- **[Agent Configurations](references/agent-configs.md)**: Agent setup files and configurations

This workflow has been battle-tested and provides a systematic approach to creating comprehensive, maintainable Playwright test suites.