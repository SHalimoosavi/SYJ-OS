import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LockScreen } from '../src/shell/LockScreen';
import { useSystemStore } from '../src/store/systemStore';

describe('LockScreen', () => { it('renders the unlock affordance without a PIN', () => { useSystemStore.getState().setSecurity({ pinHash: null, pinSalt: null }); render(<LockScreen onUnlock={vi.fn()} />); expect(screen.getByText('Swipe up to unlock')).toBeInTheDocument(); }); });
