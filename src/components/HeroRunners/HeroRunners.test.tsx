import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroRunners } from './HeroRunners';

describe('HeroRunners', () => {
  it('renders a decorative wrapper with aria-hidden="true"', () => {
    const { container } = render(<HeroRunners />);
    const wrapper = container.querySelector('[aria-hidden="true"]');
    expect(wrapper).toBeInTheDocument();
  });

  it('contains two SVG characters (groom and bride)', () => {
    const { container } = render(<HeroRunners />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs).toHaveLength(2);
  });

  it('renders without text content', () => {
    render(<HeroRunners />);
    // Should have no accessible text since it's aria-hidden decorative
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
