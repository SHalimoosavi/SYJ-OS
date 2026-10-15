import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppDrawer } from '../src/components/AppDrawer';
import { useAppStore } from '../src/store/appStore';

describe('AppDrawer', () => { it('filters apps by search', () => { useAppStore.getState().close(); render(<AppDrawer onClose={vi.fn()} />); fireEvent.change(screen.getByLabelText('Search apps'), { target: { value: 'calculator' } }); expect(screen.getByText('Calculator')).toBeInTheDocument(); expect(screen.queryByText('Settings')).not.toBeInTheDocument(); }); });
