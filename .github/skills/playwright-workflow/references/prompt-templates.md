# Prompt Templates

Ready-to-use prompts for both planning and generation phases of the Playwright workflow.

## Planning Phase Prompts

### Basic Planning Request
```markdown
Create a comprehensive test plan for [application/feature name].

Use the playwright-planner agent to:
1. Navigate and explore the web interface at [URL or local setup instructions]
2. Identify all interactive elements and user workflows
3. Create detailed test scenarios covering:
   - Happy path user journeys
   - Edge cases and boundary conditions
   - Error handling and validation scenarios
4. Structure the plan with step-by-step instructions
5. Save the test plan as a markdown file

Focus on [specific areas of concern or critical user workflows].
```

### Feature-Specific Planning
```markdown
Create a test plan for the [feature name] functionality in [application name].

Key areas to test:
- [Primary user workflow 1]
- [Primary user workflow 2]
- [Error condition 1]
- [Error condition 2]

Requirements:
- Test on [specific URL or environment]
- Consider [specific user types or permissions]
- Pay special attention to [critical functionality or integrations]

Use the playwright-planner agent to explore the interface and create detailed scenarios.
```

### Regression Testing Planning
```markdown
Create a regression test plan for [application name] covering the core user journeys.

Priority areas:
1. User authentication and authorization
2. Primary business workflows
3. Data creation, editing, and deletion
4. Navigation and routing
5. Form submissions and validations

Use the playwright-planner agent to create comprehensive scenarios that ensure existing functionality continues to work correctly.
```

## Generation Phase Prompts

### Basic Test Generation
```markdown
Generate Playwright tests from the approved test plan at [plan file path].

Use the playwright-generator agent to:
1. Review each scenario in the test plan
2. Navigate the application to validate selectors
3. Generate complete TypeScript test files following project conventions
4. Create reusable page objects for common interactions
5. Include proper waits, assertions, and error handling

Follow the existing project structure in [tests directory path].
```

### Single Scenario Generation
```markdown
Generate a Playwright test for the "[scenario name]" scenario from the test plan at [plan file path].

Requirements:
- Create a single test file for this scenario
- Follow the step-by-step instructions in the plan
- Validate all selectors using Playwright MCP tools
- Include proper comments and assertions
- Use TypeScript with @playwright/test framework

Save the test as [suggested filename].spec.ts in the appropriate directory.
```

### Batch Test Generation
```markdown
Generate Playwright tests for all scenarios in section "[section name]" from the test plan at [plan file path].

For each scenario:
1. Create individual test files
2. Validate selectors through browser navigation
3. Follow the project's existing patterns and conventions
4. Include proper test organization with describe blocks
5. Add any necessary utility functions or page objects

Use the playwright-generator agent to ensure consistent, maintainable test code.
```

## Advanced Prompts

### Custom Requirements Planning
```markdown
Create a test plan for [application] with specific focus on [custom requirements].

Special considerations:
- [Accessibility requirements]
- [Performance expectations]
- [Cross-browser compatibility needs]
- [Mobile responsiveness]
- [Integration with external systems]

Use the playwright-planner agent to create scenarios that validate these specific requirements while covering standard functionality.
```

### API Integration Testing
```markdown
Create test scenarios for [application] that include both UI interactions and API validations.

Focus areas:
- UI actions that trigger API calls
- Data synchronization between frontend and backend
- Error handling for API failures
- Loading states and user feedback

Use the playwright-planner to create comprehensive scenarios that test the full stack.
```

### Performance-Focused Testing
```markdown
Generate Playwright tests from [plan file path] with additional focus on performance metrics.

Include:
- Page load time measurements
- Network request monitoring
- Core Web Vitals tracking
- Resource usage validation

Use the playwright-generator to create tests that validate both functionality and performance.
```

## Template Customization Guidelines

### Project-Specific Modifications

When adapting these templates for your project:

1. **Replace placeholders** with actual values:
   - `[application name]` → Your app's name
   - `[URL]` → Your application's URL
   - `[tests directory path]` → Your project's test directory

2. **Add project-specific context**:
   - Authentication requirements
   - Specific browser or device requirements
   - Integration dependencies
   - Performance benchmarks

3. **Include relevant constraints**:
   - Time limitations
   - Resource availability
   - Testing environment specifics
   - Compliance requirements

### Team Collaboration Prompts

#### Review Request
```markdown
Review the test plan at [plan file path] and provide feedback on:
- Coverage completeness
- Scenario clarity and testability
- Missing edge cases or error conditions
- Alignment with project requirements

Suggest improvements or additional scenarios as needed.
```

#### Code Review Request
```markdown
Review the generated Playwright tests in [directory path] for:
- Code quality and maintainability
- Adherence to project conventions
- Selector stability and reliability
- Test independence and proper cleanup

Provide recommendations for improvements or refactoring.
```

### Integration with Project Workflows

#### CI/CD Integration Prompt
```markdown
Integrate the generated Playwright tests into our CI/CD pipeline:
1. Update pipeline configuration files
2. Add test execution steps
3. Configure test result reporting
4. Set up failure notification processes
5. Establish test maintenance procedures

Ensure tests run reliably in automated environments.
```