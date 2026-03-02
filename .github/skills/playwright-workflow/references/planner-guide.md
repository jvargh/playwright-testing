# Playwright Planner Agent Guide

This guide provides detailed instructions for using the playwright-planner agent to create comprehensive test plans.

## Agent Configuration

```yaml
---
name: playwright-planner
description: Use this agent when you need to create comprehensive test plan for a web application or website
tools:
  - search
  - edit
  - playwright/*
model: Claude Sonnet 4
---
```

## Agent Capabilities

The playwright-planner agent is an expert web test planner with extensive experience in:
- Quality assurance methodologies
- User experience testing patterns
- Test scenario design and coverage analysis
- Functional testing and edge case identification

## Core Process

### 1. Navigate and Explore
- Uses `playwright/*` tools to set up browsers and navigate to pages
- Explores web interfaces through Playwright commands
- Avoids unnecessary screenshots unless absolutely required
- Leverages Microsoft Playwright MCP capabilities for navigation and discovery
- Thoroughly explores interfaces, identifying all interactive elements, forms, navigation paths, and functionality

### 2. Analyze User Flows
- Maps primary user journeys and identifies critical paths through the application
- Considers different user types and their typical behaviors
- Identifies decision points and workflow branches

### 3. Design Comprehensive Scenarios
Creates detailed test scenarios covering:
- **Happy path scenarios**: Normal user behavior and expected workflows
- **Edge cases and boundary conditions**: Unusual but valid inputs and states
- **Error handling and validation**: Invalid inputs and system error responses

### 4. Structure Test Plans
Each scenario must include:
- Clear, descriptive title that summarizes the test objective
- Detailed step-by-step instructions that any tester can follow
- Expected outcomes where appropriate for verification
- Assumptions about starting state (always assume blank/fresh state)
- Success criteria and failure conditions

### 5. Create Documentation
Saves test plans with:
- Executive summary of the tested page/application
- Individual scenarios as separate sections
- Each scenario formatted with numbered steps
- Each test case with proposed file name for implementation
- Clear expected results for verification points

## Example Output Structure

```markdown
# [Application Name] - Comprehensive Test Plan

## Application Overview
[Description of application functionality and key features]

## Test Scenarios

### 1. [Feature Category]
**Seed:** `tests/seed.spec.ts`

#### 1.1 [Scenario Name]
**File:** `tests/[category]/[scenario-name].spec.ts`

**Steps:**
1. [Specific action with clear intent]
2. [Next action with expected behavior]
3. [Verification step]

**Expected Results:**
- [Specific observable outcome]
- [System state changes]
- [UI feedback or updates]
```

## Quality Standards

### Writing Effective Steps
- **Specificity**: Steps should be specific enough for any tester to follow without ambiguity
- **Independence**: Each scenario should be independent and runnable in any order
- **Completeness**: Include all necessary actions from start to verification
- **Clarity**: Use clear, actionable language (Click, Type, Verify, etc.)

### Coverage Requirements
- **Functional Coverage**: Test all major features and user workflows
- **Negative Testing**: Include scenarios for invalid inputs and error conditions
- **Boundary Testing**: Test limits, empty states, and edge cases
- **Cross-browser Considerations**: Note any browser-specific behaviors

### Documentation Standards
- **Professional Formatting**: Use clear headings, numbered steps, and consistent structure
- **Team Shareability**: Format suitable for sharing with development and QA teams
- **Implementation Ready**: Include enough detail for developers to create automated tests

## Common Patterns

### Navigation Testing
```markdown
**Steps:**
1. Navigate to homepage
2. Click on [specific navigation element]
3. Verify correct page loads with expected content
```

### Form Interaction Testing
```markdown
**Steps:**
1. Locate [form name] form
2. Enter [specific test data] in [field name]
3. Click Submit button
4. Verify [expected response/redirect]
```

### State Management Testing
```markdown
**Steps:**
1. Perform action that changes application state
2. Navigate away from current page
3. Return to original page
4. Verify state is maintained/lost as expected
```

## Tips for Effective Planning

### Before Starting
- Understand the application's primary purpose and user goals
- Gather any existing requirements or user story documentation
- Identify the target user types and their typical workflows

### During Exploration
- Take notes on all interactive elements discovered
- Pay attention to validation messages and error states
- Note any dynamic content or state changes
- Identify areas that might be fragile or complex

### When Writing Scenarios
- Start with the most critical user journeys
- Group related functionality into logical test categories
- Consider the user's mental model of the application
- Think about real-world usage patterns and potential mistakes

### Quality Checklist
- [ ] Each scenario has clear success/failure criteria
- [ ] Steps are specific and unambiguous
- [ ] Scenarios cover happy path, edge cases, and errors
- [ ] Test plan is organized and professional
- [ ] File names are provided for implementation
- [ ] Starting assumptions are clearly stated