# 🤝 Contributing to AgentGuard

Thank you for your interest in contributing to AgentGuard! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)
7. [Testing](#testing)
8. [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Our Standards

- ✅ Be respectful and inclusive
- ✅ Accept constructive criticism
- ✅ Focus on what's best for the community
- ❌ No harassment or discriminatory behavior
- ❌ No trolling or personal attacks

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Docker Desktop
- Git

### Fork and Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/agentguard.git
cd agentguard

# Add upstream remote
git remote add upstream https://github.com/original/agentguard.git
```

### Setup Development Environment

```bash
# Start services
docker-compose up -d

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install -r requirements-dev.txt

# Frontend setup
cd ../frontend
npm install
```

---

## 🔄 Development Workflow

### 1. Create a Branch

```bash
# Update main
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write code
- Add tests
- Update documentation

### 3. Test Locally

```bash
# Backend tests
cd backend
pytest

# Frontend tests
cd frontend
npm test

# E2E tests
npm run test:e2e
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
# Create PR on GitHub
```

---

## 💻 Coding Standards

### Python (Backend)

**Style Guide**: PEP 8

```python
# Use type hints
def calculate_risk_score(agent_id: str) -> float:
    """Calculate risk score for an agent.
    
    Args:
        agent_id: Unique identifier for the agent
        
    Returns:
        Risk score between 0 and 10
    """
    pass

# Use descriptive names
user_count = 10  # Good
uc = 10  # Bad

# Keep functions small
def process_data():
    data = load_data()
    cleaned = clean_data(data)
    return analyze_data(cleaned)
```

**Tools**:
```bash
# Format code
black .

# Lint
flake8 .

# Type check
mypy .
```

### TypeScript/React (Frontend)

**Style Guide**: Airbnb + Prettier

```typescript
// Use functional components
export function AgentCard({ agent }: AgentCardProps) {
  return <div>{agent.name}</div>;
}

// Use TypeScript interfaces
interface Agent {
  id: string;
  name: string;
  type: string;
}

// Use descriptive names
const isLoading = true;  // Good
const flag = true;  // Bad
```

**Tools**:
```bash
# Format code
npm run format

# Lint
npm run lint

# Type check
npm run type-check
```

---

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(graph): add SPOF detection algorithm"

# Bug fix
git commit -m "fix(simulator): correct blast radius calculation"

# Documentation
git commit -m "docs(readme): update installation instructions"

# With body
git commit -m "feat(playbook): add Gemini integration

- Integrate Gemini 2.0 API
- Add playbook generation service
- Update environment variables

Closes #123"
```

---

## 🔀 Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Commit messages follow convention
- [ ] Branch is up to date with main

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How has this been tested?

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] No new warnings
```

### Review Process

1. Automated checks run (CI/CD)
2. Code review by maintainers
3. Address feedback
4. Approval and merge

---

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
pytest

# Run specific test
pytest tests/test_scanner.py

# With coverage
pytest --cov=services --cov-report=html

# Watch mode
pytest-watch
```

### Frontend Tests

```bash
cd frontend

# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### Writing Tests

**Backend Example**:
```python
import pytest
from services.scanner import ScannerService

@pytest.mark.asyncio
async def test_parse_traces():
    scanner = ScannerService()
    traces = [{"traceId": "abc", "spans": [...]}]
    
    result = await scanner.parse_otel_traces(traces)
    
    assert result["total_agents"] > 0
    assert "PricingAgent" in [a.name for a in result["agents"]]
```

**Frontend Example**:
```typescript
import { render, screen } from '@testing-library/react';
import { AgentCard } from './AgentCard';

test('renders agent name', () => {
  const agent = { id: '1', name: 'PricingAgent', type: 'llm' };
  render(<AgentCard agent={agent} />);
  
  expect(screen.getByText('PricingAgent')).toBeInTheDocument();
});
```

---

## 📚 Documentation

### Code Documentation

**Python**:
```python
def calculate_blast_radius(agent_id: str, graph: nx.DiGraph) -> float:
    """Calculate blast radius for agent failure.
    
    Uses BFS to traverse dependency graph and calculate impact score.
    
    Args:
        agent_id: ID of the agent to simulate failure
        graph: NetworkX directed graph of dependencies
        
    Returns:
        Blast radius score between 0 and 10
        
    Raises:
        ValueError: If agent_id not found in graph
        
    Example:
        >>> graph = nx.DiGraph()
        >>> score = calculate_blast_radius("agent1", graph)
        >>> print(score)
        8.5
    """
    pass
```

**TypeScript**:
```typescript
/**
 * Calculate risk score for an agent
 * 
 * @param agent - Agent object with metadata
 * @param dependencies - List of dependent agents
 * @returns Risk score between 0 and 10
 * 
 * @example
 * ```ts
 * const score = calculateRiskScore(agent, deps);
 * console.log(score); // 7.5
 * ```
 */
export function calculateRiskScore(
  agent: Agent,
  dependencies: Agent[]
): number {
  // Implementation
}
```

### README Updates

When adding features, update:
- Main README.md
- Relevant guide (FRONTEND_GUIDE.md, BACKEND_GUIDE.md)
- API documentation

---

## 🎯 Areas for Contribution

### High Priority

- [ ] Real OpenTelemetry integration
- [ ] GitHub Actions log parser
- [ ] PagerDuty/Rootly integration
- [ ] Performance optimizations
- [ ] Test coverage improvements

### Good First Issues

- [ ] Add more demo datasets
- [ ] Improve error messages
- [ ] Add loading animations
- [ ] Write documentation
- [ ] Fix typos

### Advanced

- [ ] ML-based confidence scoring
- [ ] Auto-remediation engine
- [ ] Agent governance features
- [ ] Multi-region support

---

## 🐛 Reporting Bugs

### Before Reporting

- Check existing issues
- Verify it's reproducible
- Collect relevant information

### Bug Report Template

```markdown
## Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
If applicable

## Environment
- OS: [e.g., macOS 14]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]

## Additional Context
Any other relevant information
```

---

## 💡 Feature Requests

### Feature Request Template

```markdown
## Problem
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Mockups, examples, etc.
```

---

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

Top contributors may be invited to join the core team!

---

## 📞 Getting Help

- **GitHub Issues**: For bugs and features
- **Discord**: For questions and discussions
- **Email**: team@agentguard.ai

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to AgentGuard! 🚀**
